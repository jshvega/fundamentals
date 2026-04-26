# FUNDAMENTALS
### by Manfred Vega

> I noticed I was learning a lot of theory but never actually building anything on my own. FUNDAMENTALS is my attempt at correcting that... five projects, increasing in complexity, written without AI generating my code.


\---


## The projects

|#|Project|Stack|Status|
|-|-|-|-|
|01|[Calculator](./calculator)|HTML · CSS · Vanilla JS|🚧 Not started|
|02|[To-Do App](./todo)|Vanilla JS · localStorage|🚧 Not started|
|03|[Weather Dashboard](./weather)|React · TypeScript · Vite|🚧 Not started|
|04|[Movie Searcher](./movies)|Next.js · TypeScript · TanStack Query|🚧 Not started|
|05|[Expense Tracker](./expenses)|Next.js · Supabase · Docker · GitHub Actions|🚧 Not started|


\---


## Rules

This project has one rule: **AI does not write my code.**

Everything else is fair game (to an extent) — reading docs, watching tutorials, asking for concept explanations, architecture consulting, code review after the fact. The line is drawn at AI generating, completing, or fixing actual implementation code.

That includes:

* No "write me a function that does X"
* No "fix this bug" with code pasted in
* No generating components or logic, even partially

What AI was used for in this project:

* Roadmap and stack decisions
* Monorepo and deployment strategy
* README structure and documentation

The goal isn't purity for its own sake. It's to prove, to myself first, that I can build real things without a crutch. Once these five projects are done, I'll use every tool available. But not yet.


\---


## Repo structure

```
FUNDAMENTALS/
├── index.html          # Hub page — links to all five projects
├── style.css
├── README.md           # You're here
├── .gitignore
├── calculator/
├── todo/
├── weather/
├── movies/
└── expenses/
```

Each project folder contains its own README with stack, goals, what was learned, and challenges faced.


\---


## How to run locally

The first two projects are plain HTML/CSS/JS — just open `calculator/index.html` in a browser.

Projects 3–5 use a build tool. From the relevant subfolder:

```bash
npm install
npm run dev
```

Each project's README has its own setup instructions.


\---


Started April 2026.