'use client'

import CodeBlock from '@/components/CodeBlock'
import ProTip from '@/components/ProTip'
import StepCard from '@/components/StepCard'

function Section({
  id,
  number,
  label,
  title,
  children,
}: {
  id: string
  number?: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.028))] p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-start gap-4 mb-6">
        {number ? (
          <div
            className="number-glow flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-base font-bold"
            style={{ background: 'rgba(124, 105, 199, 0.20)', color: '#7C69C7', border: '1.5px solid rgba(124, 105, 199, 0.35)' }}
          >
            {number}
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-[#7C69C7] text-xs font-semibold uppercase tracking-[0.22em] mb-3">{label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FCF4EB]">{title}</h2>
        </div>
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  )
}

function PromptCard({
  id,
  number,
  title,
  intro,
  filename = 'Claude Code prompt',
  prompt,
}: {
  id?: string
  number?: string
  title: string
  intro?: string
  filename?: string
  prompt: string
}) {
  return (
    <div id={id} className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(0,0,0,0.10))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-start gap-4">
        {number ? (
          <div
            className="number-glow flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'rgba(124, 105, 199, 0.20)', color: '#7C69C7', border: '1.5px solid rgba(124, 105, 199, 0.35)' }}
          >
            {number}
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <h3 className="text-[1.1rem] font-bold text-[#FCF4EB] mb-3 leading-tight">{title}</h3>
          {intro ? <p className="text-[#FCF4EB]/62 leading-relaxed mb-4 text-[15px]">{intro}</p> : null}
          <CodeBlock filename={filename} editable codexPrompt code={prompt} />
        </div>
      </div>
    </div>
  )
}

function TeachingCard({
  id,
  step,
  eyebrow,
  title,
  children,
}: {
  id?: string
  step: string
  eyebrow?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="group card-hover card-shimmer rounded-[26px] border border-white/[0.11] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.035))] p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex items-start gap-5">
        <div
          className="number-glow flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-bold"
          style={{ background: 'rgba(124, 105, 199, 0.20)', color: '#7C69C7', border: '1.5px solid rgba(124, 105, 199, 0.35)', fontSize: step.length > 1 ? '0.82rem' : '1rem' }}
        >
          {step}
        </div>
        <div className="flex-1 min-w-0">
          {eyebrow ? <p className="text-[#FCF4EB]/48 text-[11px] font-semibold uppercase tracking-[0.18em] mb-2">{eyebrow}</p> : null}
          <h3 className="text-xl md:text-[1.35rem] font-bold text-[#FCF4EB] leading-tight mb-4 group-hover:text-white transition-colors duration-200">{title}</h3>
          <div className="space-y-4 text-[15px] text-[#FCF4EB]/72 leading-[1.72]">{children}</div>
        </div>
      </div>
    </div>
  )
}

function FrameworkBlock({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/[0.10] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="space-y-3 text-[1.12rem] leading-[1.65] text-[#FCF4EB]/88">
        {lines.map((line, index) => (
          <p key={`${index}-${line}`} className={line === '' ? 'h-2' : ''}>
            {line || '\u00A0'}
          </p>
        ))}
      </div>
    </div>
  )
}

function StructureCard({
  number,
  title,
  time,
  items,
}: {
  number: string
  title: string
  time: string
  items: string[]
}) {
  return (
    <div className="rounded-[24px] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-start gap-4">
        <div
          className="number-glow flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(124, 105, 199, 0.20)', color: '#7C69C7', border: '1.5px solid rgba(124, 105, 199, 0.35)' }}
        >
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <h4 className="text-[#FCF4EB] font-semibold text-lg leading-tight">{title}</h4>
            <span className="text-xs text-[#FCF4EB]/40 whitespace-nowrap">{time}</span>
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-3 text-sm text-[#FCF4EB]/68 leading-relaxed">
            {items.map((item) => (
              <li key={item} className="flex gap-2 items-start rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-2">
                <span className="text-[#7C69C7] mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[#FCF4EB]/68 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="text-[#7C69C7]">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TianaAiPositioningWorkshop() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-16">
      <div className="pt-20 pb-10">
        <div className="mb-5 space-y-2">
          <p className="text-sm uppercase tracking-[0.22em] text-[#F5C3C6] font-semibold">Created by Tiyana Ti</p>
          <p className="text-sm uppercase tracking-[0.22em] text-[#FCF4EB]/74 font-semibold">Adapted by Joe Che</p>
          <p className="text-xs uppercase tracking-[0.24em] text-[#FCF4EB]/45 font-semibold">Adapted by Joe Che for the Masterminds HQ bonus workshop.</p>
        </div>
        <h1 className="gradient-text text-5xl md:text-6xl font-extrabold leading-[0.98] pb-1 mb-5 max-w-4xl">
          How to Stand Out in the Age of AI
        </h1>
        <p className="text-lg text-[#FCF4EB]/60 max-w-4xl leading-relaxed mb-8">
          Messaging and Positioning Workshop. Series of 3 parts, about 90 to 100 minutes each.
          This page turns Part 1 into an interactive workshop flow you can fill in, copy, and use with Claude as you go.
        </p>
        <div className="mb-8">
          <a
            href="https://www.tiyara.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#7C69C7]/28 bg-[#7C69C7]/10 px-4 py-2 text-sm font-medium text-[#FCF4EB]/78 transition-colors hover:text-white"
          >
            Visit Tiyara.co
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4h6v6M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <details open className="rounded-2xl overflow-hidden border border-white/[0.10] bg-[linear-gradient(145deg,rgba(124,105,199,0.07),rgba(255,255,255,0.03))] shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.07)]">
          <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#9D8FE0] shadow-[0_0_12px_rgba(157,143,224,0.70)]" />
              <span className="text-xs uppercase tracking-[0.20em] text-[#FCF4EB]/65 font-semibold">Table of Contents</span>
            </div>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(124,105,199,0.15)] border border-[rgba(124,105,199,0.28)] text-[#9D8FE0]">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </summary>
          <div className="border-t border-white/[0.07] mx-5" />
          <div className="px-6 py-5 space-y-5">
            {[
              {
                heading: 'Sections',
                items: [
                  { href: '#start-here', label: 'Start Here', number: '1-3' },
                  { href: '#live-session', label: 'Live Session', number: '4-13' },
                  { href: '#before-part-2', label: 'Before Part 2', number: '14' },
                  { href: '#positioning-builder', label: 'Workbook', number: '21-27' },
                ],
              },
            ].map((group) => (
              <div key={group.heading} className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#FCF4EB]/38 font-semibold">{group.heading}</p>
                <ol className="space-y-2.5">
                  {group.items.map(({ href, label, number }) => (
                    <li key={href} className="flex items-start gap-3 group/item min-w-0">
                      <span
                        className="flex-shrink-0 min-w-[3.25rem] rounded-full border border-[#7C69C7]/30 bg-[#7C69C7]/12 px-2.5 py-1 text-center text-[10px] font-bold tabular-nums text-[#9D8FE0] mt-0.5"
                      >
                        {number}
                      </span>
                      <a href={href} className="text-[#FCF4EB]/54 hover:text-[#9D8FE0] text-[13px] leading-[1.35] transition-colors duration-150">
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </details>
      </div>

      <div className="space-y-8">
        <div className="rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.028))] p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-[#7C69C7] text-xs font-semibold uppercase tracking-[0.22em] mb-3">Bonus Session Recording</p>
          <h2 className="text-2xl font-bold text-[#FCF4EB] mb-2">Watch the May 13 Bonus Session</h2>
          <p className="text-[#FCF4EB]/60 text-sm mb-6 leading-relaxed">Full live recording from the Age of AI bonus workshop for both cohorts, hosted on the Cohort 1 Zoom room.</p>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden', borderRadius: '12px' }}>
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              src="https://www.youtube.com/embed/TfLytZNk3ls"
              title="AI Positioning Workshop"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <Section id="start-here" label="Start Here" title="Gather Your Materials">
          <p className="text-[#FCF4EB]/68 leading-relaxed">
            Take the first few minutes of the session to complete these three tasks while everyone settles in. You only need your current messaging and five minutes with Claude.
          </p>

          <PromptCard
            number="1"
            title="Find Your Current Messaging"
            intro="Pull up one of the following and paste it into the box below. You only need one."
            filename="Your current messaging"
            prompt={`Your website homepage headline and subheadline,
your LinkedIn bio or About section,
or your main offer description from your sales page, a proposal, or a recent social post.

[PASTE YOUR CURRENT MESSAGING HERE]`}
          />

          <PromptCard
            number="2"
            title="Run the AI Description Test — Baseline"
            intro="Paste your messaging from above into Claude, then send this prompt. Screenshot or copy the output. This is your before picture."
            prompt={`Describe what I do, who I serve, and what makes me different from others in my space. Base your answer only on the text I just gave you.`}
          />

          <PromptCard
            number="3"
            title="Collect Your Client Language"
            intro="Paste testimonials, intake responses, client emails, or DMs. If you have more than ten, use this prompt to extract the most useful phrases."
            prompt={`Read these testimonials and give me the five most repeated phrases my clients use to describe the problem they had before working with me. Use their exact language, not a summary.

[PASTE CLIENT FEEDBACK HERE]`}
          />
        </Section>

        <Section id="live-session" label="Live Session" title="Part 1: The AI Era and Where You Stand">
          <p className="text-[#FCF4EB]/68 leading-relaxed">
            Follow along with the facilitator. Each prompt below maps to a live exercise. Fill in your answers as you go.
          </p>

          <PromptCard
            number="4"
            title="The AI Description Test"
            intro="Paste your current messaging, then send this prompt to Claude. Read the output aloud."
            prompt={`Use only the messaging below.

Messaging:
[PASTE CURRENT MESSAGING HERE]

Describe:
1. What I do
2. Who I serve
3. What makes me different from others in my space

Base your answer only on the text I just gave you.`}
          />

          <PromptCard
            number="5"
            title="Two Markets: Which One Are You In?"
            prompt={`My current messaging:
[PASTE HERE]

Which market is my current messaging operating in?

Visible Market: features, price, specs
Mental Market: beliefs, identity, meaning

My answer:
[WRITE HERE]

Then help me explain why in plain language.`}
          />

          <PromptCard
            number="6"
            title="The Full Through-Line"
            prompt={`The series chain is:
Positioning -> Language -> Leads -> System

Where in that chain is my business currently strongest?
[WRITE HERE]

Where is the gap?
[WRITE HERE]

Then help me summarise the real bottleneck in one sentence.`}
          />

          <PromptCard
            number="7"
            title="Exercise: The Client's Moment"
            intro="Think of your best-ever client, a specific real person rather than an ideal."
            prompt={`1. What situation were they in when they first found you?
[WRITE HERE]

2. What was the moment that made them realise they needed to change?
[WRITE HERE]

3. What had they already tried that had not worked?
[WRITE HERE]

4. Which awareness level were they at when they first encountered your content?
[WRITE HERE]

Then help me tighten these answers without changing the truth.`}
          />

          <PromptCard
            number="8"
            title="Hard or Easy?"
            prompt={`Are my sales conversations hard or easy?
[WRITE HERE]

What does that tell me about which market my offer is positioned in?
[WRITE HERE]`}
          />

          <PromptCard
            number="9"
            title="The Competitive Alternative"
            intro="The real competition is rarely another provider. Answer honestly."
            prompt={`I want to clarify my positioning using the competitive alternative framework.

Here is what I offer:
[DESCRIBE YOUR OFFER]

Here is the kind of client I serve:
[DESCRIBE THE CLIENT]

Tell me:
1. What this client would most likely have done if they had never found me
2. Why that alternative feels attractive at first
3. What that alternative cannot provide that I can
4. Which of those differences is strongest for positioning

Be honest and realistic. Do not default to "they would have hired a competitor" unless that is truly the most likely answer.`}
          />

          <PromptCard
            number="10"
            title="The Common Enemy"
            prompt={`What is the dominant approach in my industry that I believe is wrong or incomplete?
[WRITE HERE]

Then help me sharpen that into one sentence that starts with what my brand stands against.`}
          />

          <PromptCard
            number="11"
            title="Anti-Positioning"
            prompt={`Complete this sentence:

"This offer is not for [type of person] who wants [outcome I do not deliver]."

My first version:
[WRITE HERE]

Then help me improve it without making it harsher than it needs to be.`}
          />

          <PromptCard
            number="12"
            title="Exercise: The Positioning Statement"
            prompt={`Use this framework:

For [specific type of person]
who is currently [specific situation],

I help them [specific outcome]

by [specific method or approach]

that [real competitive alternative] cannot provide.

My notes:
- Person: [WRITE HERE]
- Situation: [WRITE HERE]
- Outcome: [WRITE HERE]
- Method: [WRITE HERE]
- Competitive alternative: [WRITE HERE]

Then give me:
1. A first draft
2. A sharper version
3. The one line most likely to still be too broad

Assume the first version is too broad and help me move it toward specificity, not perfection.`}
          />

          <PromptCard
            number="13"
            title="The Specificity Test"
            prompt={`Test this positioning statement for specificity.

Statement:
[PASTE POSITIONING STATEMENT HERE]

Evaluate it against these questions:
1. Could my three nearest competitors say this word for word?
2. Does this describe a specific person in a specific situation, or just a category?
3. Is the outcome a felt outcome, or just a feature someone would compare?

Then tell me:
4. Which part is still too broad
5. What the felt outcome is underneath the feature language

Then rewrite it once to make it more specific without making it longer.`}
          />
        </Section>

        <Section id="before-part-2" label="Before Part 2" title="Prepare for the Next Session">
          <p className="text-[#FCF4EB]/68 leading-relaxed">
            Before Part 2, do this once. It takes five minutes and makes the next session significantly more useful.
          </p>

          <PromptCard
            number="14"
            title="Refine Your Positioning Statement"
            intro="Read your positioning statement aloud to one person who knows your work. Ask them the three questions below, then refine once and save the result."
            prompt={`Read your refined positioning statement aloud to one person who knows your work.

Ask them:
1. Does this sound like me?
2. Does it sound specific, like it was written for one person?
3. Would my best client recognise themselves in this?

Based on their answers, make one more refinement.

My one more refinement:
[WRITE HERE]

Bring that version to Part 2.`}
          />
        </Section>

        <Section id="positioning-builder" number="20" label="Part 1 Workbook" title="Positioning Statement Builder">
          <div className="space-y-4">
            <p className="text-[#FCF4EB]/68 leading-relaxed">
              Use this during the session to write and refine your first-draft positioning statement. Save it, refine it before Part 2, and bring the updated version back. It becomes Section 4 of your Brand Brain.
            </p>
            <div className="rounded-2xl border border-[#F5C3C6]/25 bg-[linear-gradient(135deg,rgba(245,195,198,0.12),rgba(124,105,199,0.08))] p-6">
              <p className="text-[#F5C3C6] text-xs uppercase tracking-widest font-semibold mb-3">Disclaimer</p>
              <p className="text-[#FCF4EB]/78 leading-relaxed">
                Your first draft will be too broad. That is completely normal and expected. The goal today is not a perfect statement. It is a statement that is noticeably more specific than what you had when you walked in. You will refine it between sessions.
              </p>
            </div>
          </div>

          <PromptCard
            id="workbook-foundation"
            number="21"
            title="Before You Write: The Foundation"
            intro="Answer these questions first. They are the raw material for your positioning statement."
            filename="Editable worksheet"
            prompt={`Your best-ever client's situation:
What situation were they in when they first found you?
What had they already tried that had not worked?
What was the moment that made them realise they needed to change?

[Write here]

The real competitive alternative:
What would that client have done if they had never found you?
Be honest. Not "hired a competitor." What they would ACTUALLY have done.

[Write here]

What you offer that the alternative cannot:
[Write here]

Who cares most intensely about that:
[Write here]

What you stand against:
[Write here]

Who you do not serve:
This offer is not for [type of person] who wants [outcome you do not deliver].

[Write here]`}
          />

          <PromptCard
            id="workbook-statement"
            number="22"
            title="Write Your Positioning Statement"
            filename="Editable worksheet"
            prompt={`Use the framework. Fill in all five parts.

For [specific type of person]
who is currently [specific situation],

I help them [specific outcome]

by [specific method or approach]

that [real competitive alternative] cannot provide.

Your first draft:

For _______________________________________________

who is currently ___________________________________

I help them ________________________________________

by _________________________________________________

that _______________________________________________ cannot provide.`}
          />

          <PromptCard
            id="workbook-specificity"
            number="23"
            title="The Specificity Test"
            filename="Editable worksheet"
            prompt={`Question 1:
Could your three nearest competitors say this word for word?

Yes / No

If yes - which part is still too broad?
___________________________________________________

Question 2:
Does this describe a specific person in a specific situation, or a category of people?

Specific person / Category

What would make it more specific?
___________________________________________________

Question 3:
Does the outcome describe something someone actually wants to feel, or a feature they would compare?

Felt outcome / Feature

What is the felt outcome underneath the feature you wrote?
___________________________________________________`}
          />

          <PromptCard
            id="workbook-refined"
            number="24"
            title="Your Refined Draft"
            filename="Editable worksheet"
            prompt={`After applying the specificity test, write a refined version:

For _______________________________________________

who is currently ___________________________________

I help them ________________________________________

by _________________________________________________

that _______________________________________________ cannot provide.`}
          />

          <PromptCard
            id="workbook-awareness"
            number="25"
            title="The Awareness Check"
            filename="Editable worksheet"
            prompt={`Which awareness level is most of your current audience at when they first encounter your content?

Level 1 - Unaware
Level 2 - Problem Aware
Level 3 - Solution Aware
Level 4 - Product Aware
Level 5 - Most Aware

My answer:
[Write here]

Which awareness level is most of your content currently speaking to?

Level 1 - Unaware
Level 2 - Problem Aware
Level 3 - Solution Aware
Level 4 - Product Aware
Level 5 - Most Aware

My answer:
[Write here]

If those two answers are different, that is your content strategy gap.

What would one piece of content for the right awareness level look like?
[Write a rough idea here]`}
          />

          <PromptCard
            id="workbook-lead-generation"
            number="26"
            title="Positioning to Lead Generation"
            filename="Editable worksheet"
            prompt={`Where does your ideal client spend time before they know they need you?
[Write here]

What are they searching for in words they would actually use?
[Write here]

What content could you create that would make a Level 2 client feel: "this person understands exactly what I'm going through"?
[Write here]

Visible Market or Mental Market?

Visible Market - I lead with features, deliverables, what is included
Mental Market - I lead with identity, transformation, who they become

My current lead gen is mostly:
[Write here]

What one change would shift it toward the Mental Market?
[Write here]`}
          />

          <PromptCard
            id="workbook-part-2"
            number="27"
            title="Between Now and Part 2"
            filename="Editable worksheet"
            prompt={`Before Part 2, do this once:

Read your refined positioning statement aloud to one person who knows your work.

Ask them:
1. Does this sound like me?
2. Does it sound specific, like it was written for one person?
3. Would my best client recognise themselves in this?

Based on their answers, make one more refinement.

Bring that version to Part 2.

My one more refinement:
[Write here]`}
          />
        </Section>
      </div>
    </div>
  )
}
