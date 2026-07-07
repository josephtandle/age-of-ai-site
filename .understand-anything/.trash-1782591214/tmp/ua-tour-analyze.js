#!/usr/bin/env node
'use strict';

const fs = require('fs');

function main() {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  if (!inputPath || !outputPath) {
    console.error('Usage: ua-tour-analyze.js <input.json> <output.json>');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  const layers = data.layers || [];

  const nodeById = {};
  nodes.forEach((n) => { nodeById[n.id] = n; });

  // Fan-in / fan-out
  const fanIn = {};
  const fanOut = {};
  nodes.forEach((n) => { fanIn[n.id] = 0; fanOut[n.id] = 0; });
  edges.forEach((e) => {
    if (fanOut[e.source] !== undefined) fanOut[e.source]++;
    if (fanIn[e.target] !== undefined) fanIn[e.target]++;
  });

  const fanInRanking = nodes
    .map((n) => ({ id: n.id, fanIn: fanIn[n.id], name: n.name }))
    .sort((a, b) => b.fanIn - a.fanIn)
    .slice(0, 20);

  const fanOutRanking = nodes
    .map((n) => ({ id: n.id, fanOut: fanOut[n.id], name: n.name }))
    .sort((a, b) => b.fanOut - a.fanOut)
    .slice(0, 20);

  // Entry point candidates
  const entryNames = new Set(['index.ts','index.js','main.ts','main.js','app.ts','app.js','server.ts','server.js','mod.rs','main.go','main.py','main.rs','manage.py','app.py','wsgi.py','asgi.py','run.py','__main__.py','Application.java','Main.java','Program.cs','config.ru','index.php','App.swift','Application.kt','main.cpp','main.c','page.tsx']);

  const fanOutValues = nodes.map((n) => fanOut[n.id]).sort((a, b) => b - a);
  const topFanOutThreshold = fanOutValues[Math.max(0, Math.floor(fanOutValues.length * 0.1) - 1)] || 0;
  const fanInValues = nodes.map((n) => fanIn[n.id]).sort((a, b) => a - b);
  const lowFanInIdx = Math.max(0, Math.floor(fanInValues.length * 0.25) - 1);
  const lowFanInThreshold = fanInValues[lowFanInIdx] || 0;

  const entryPointCandidates = nodes
    .map((n) => {
      let score = 0;
      if (n.type === 'document') {
        if (n.name === 'README.md' && !n.filePath.includes('/')) score += 5;
        else if (n.name.endsWith('.md') && !n.filePath.includes('/')) score += 2;
      } else {
        if (entryNames.has(n.name)) score += 3;
        const depth = n.filePath.split('/').length;
        if (depth <= 3) score += 1;
        if (fanOut[n.id] >= topFanOutThreshold && fanOut[n.id] > 0) score += 1;
        if (fanIn[n.id] <= lowFanInThreshold) score += 1;
      }
      return { id: n.id, score, name: n.name, summary: n.summary };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // BFS from top code entry point
  const adj = {};
  nodes.forEach((n) => { adj[n.id] = []; });
  edges.forEach((e) => {
    if ((e.type === 'imports' || e.type === 'calls') && adj[e.source]) {
      adj[e.source].push(e.target);
    }
  });

  const codeEntry = entryPointCandidates.find((c) => nodeById[c.id] && nodeById[c.id].type !== 'document');
  const startNode = codeEntry ? codeEntry.id : (nodes[0] && nodes[0].id);

  const order = [];
  const depthMap = {};
  if (startNode) {
    const queue = [startNode];
    depthMap[startNode] = 0;
    while (queue.length) {
      const cur = queue.shift();
      order.push(cur);
      (adj[cur] || []).forEach((t) => {
        if (depthMap[t] === undefined) {
          depthMap[t] = depthMap[cur] + 1;
          queue.push(t);
        }
      });
    }
  }
  const byDepth = {};
  Object.keys(depthMap).forEach((id) => {
    const d = depthMap[id];
    if (!byDepth[d]) byDepth[d] = [];
    byDepth[d].push(id);
  });

  // Non-code inventory
  const nonCodeFiles = { documentation: [], infrastructure: [], data: [], config: [] };
  nodes.forEach((n) => {
    const entry = { id: n.id, name: n.name, summary: n.summary };
    if (n.type === 'document') nonCodeFiles.documentation.push(entry);
    else if (['service', 'pipeline', 'resource'].includes(n.type)) nonCodeFiles.infrastructure.push(entry);
    else if (['table', 'schema', 'endpoint'].includes(n.type)) nonCodeFiles.data.push(entry);
    else if (n.type === 'config') nonCodeFiles.config.push(entry);
  });

  // Clusters: bidirectional pairs, expand
  const edgeSet = new Set(edges.map((e) => e.source + '->' + e.target));
  const clusters = [];
  const seenPair = new Set();
  edges.forEach((e) => {
    const rev = e.target + '->' + e.source;
    if (edgeSet.has(rev)) {
      const key = [e.source, e.target].sort().join('|');
      if (!seenPair.has(key)) {
        seenPair.add(key);
        clusters.push({ nodes: [e.source, e.target], edgeCount: 2 });
      }
    }
  });

  const layerOut = {
    count: layers.length,
    list: layers.map((l) => ({ id: l.id, name: l.name, description: l.description })),
  };

  const nodeSummaryIndex = {};
  nodes.forEach((n) => {
    nodeSummaryIndex[n.id] = { name: n.name, type: n.type, summary: n.summary };
  });

  const out = {
    scriptCompleted: true,
    entryPointCandidates,
    fanInRanking,
    fanOutRanking,
    bfsTraversal: { startNode, order, depthMap, byDepth },
    nonCodeFiles,
    clusters: clusters.slice(0, 10),
    layers: layerOut,
    nodeSummaryIndex,
    totalNodes: nodes.length,
    totalEdges: edges.length,
  };

  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
  process.exit(0);
}

try {
  main();
} catch (err) {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
}
