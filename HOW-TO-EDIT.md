# How Tiyana Can Edit This Site

## 1. Clone the repo

```bash
git clone https://github.com/josephtandle/age-of-ai-site.git
cd age-of-ai-site
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run the site locally

```bash
npm run dev
```

Then open:

`http://localhost:3000`

## 4. Edit the workshop page

The main content lives in:

`src/content/tiana-ai-positioning-workshop.tsx`

The editable copy-and-paste prompt blocks are rendered by:

`src/components/CodeBlock.tsx`

## 5. Save and preview

Every change should update locally while the dev server is running.

## 6. Commit and push

```bash
git add .
git commit -m "Update workshop page"
git push origin main
```

## 7. Live site

The production site is:

`https://ageofai.mastermindshq.business`

This repo is connected to Vercel, so pushing to `main` updates the live site.
