# CoFoundr AI — An AI-native Operating System for Startups

Developed for the **OpenAI Build Week**, CoFoundr AI is a coordinated multi-agent co-founding suite designed to validate ideas, compile investable business plans, and orchestrate strategies. The application converts raw startup descriptions into a structured, Notion-style persistent memory workspace, recalculating dependencies dynamically through an AI Decision Engine.

---

## Key Features

1. **AI CEO Onboarding Boardroom**: An interactive chat interview with an experienced startup founder (rather than a generic GPT model) clarifying name, target audience, pricing, and business mechanics.
2. **Multi-Agent Orchestrator System**: Dispatches specialized agents sequentially to build targeted plans:
   - **Research Agent**: Competitor analysis, SWOT studies, and industry demand metrics.
   - **Product Agent**: MVP features scoping, future roadmaps, and developer tech stack recommendations.
   - **Finance Agent**: Tiered pricing strategies, 12-month projections, and funding asks.
   - **Marketing Agent**: GTM launch campaigns, acquisition channels, and viral loops.
   - **CEO Synthesis**: Combines independent agent plans into a unified Executive Summary.
3. **Persistent Startup Workspace**: A structured workspace organizing overview files, SWOT matrices, roadmaps, and a Business Model Canvas.
4. **Notion-Style Inline Editor**: Supports double-click edits on cards, triggering local debounced indicators and **Autosave** notifications.
5. **Intelligent AI Decision Engine**: Given a workspace modification, it checks a **Dependency Map** to re-run only the affected agents (e.g. changing pricing re-runs Finance and Marketing), processes a CEO review summary, and updates the workspace.
6. **Version Stack & Undo System**: Restores previous stable state snapshots in one click, recording rollbacks in a dedicated Change History timeline log.
7. **Investor Package Cockpit**:
   - **Interactive 10-slide Pitch Deck** presentation viewer.
   - **Outreach Email Templates** (Cold Email, Follow-ups, Meeting requests) dynamically preloaded with active workspace parameters.
   - **Instant Exports**: Download structured blueprints in **Markdown** or **JSON**, and print/save **PDFs**.
8. **Demo Mode (Preloader)**: Preloads a sample startup ("Amal043 CoFoundr AI") complete with dashboard charts, logs, and version stacks in one click, enabling instant evaluation for judges.
9. **SVG Analytics Charts**: Custom dark-theme SVG charts mapping 12-month revenue forecasts and marketing conversion funnels.

---

## Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router, dynamic API server routes)
- **Programming Language**: TypeScript (strict type check verified)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion & Lucide Icons
- **AI Integration**: OpenAI completions API model (`gpt-4o-mini`)
- **Memory & Storage**: Persistent LocalStorage wrapper (database-ready interface)

### Folder Directory Structure

```
├── app/
│   ├── api/
│   │   ├── agents/
│   │   │   ├── research/     <- Research agent compilation route
│   │   │   ├── product/      <- Product scoping route
│   │   │   ├── finance/      <- Finance projections route
│   │   │   ├── marketing/    <- Marketing GTM route
│   │   │   └── synthesis/    <- CEO final synthesis route
│   │   ├── status/           <- Checks OpenAI key status on server host
│   │   └── chat/             <- Interactive onboarding interview chat API
│   ├── dashboard/            <- Overview stats and SVG charts
│   ├── workspace/            <- Notion-style editor cockpit
│   ├── investor/             <- Pitch deck, emails, and export center
│   ├── settings/             <- Model check and workspace resets
│   ├── not-found.tsx         <- Custom 404
│   └── error.tsx             <- Global error boundary handler
├── components/
│   ├── workspace/            <- Editor cards, canvas, and timeline roadmaps
│   ├── investor/             <- Presentations viewer and email copiers
│   ├── dashboard/            <- Custom SVG analytics charts
│   └── shared/               <- Logo and core buttons
├── lib/
│   ├── ai/                   <- Prompt engineering and API clients
│   ├── decision-engine/      <- Diffs, dependencies graph, and engine runners
│   ├── workspace/            <- Storage managers and context builders
│   └── demo/                 <- Try Demo preloader dataset
└── types/                    <- Typings schemas
```

---

## Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Amal043/CoFoundr_AI.git
cd CoFoundrAi
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root folder:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
*Note: If no API key is specified, the application automatically runs in **Mock Simulation Mode**, serving high-fidelity, customized startup data mockups based on user specifications.*

### 3. Running Locally (Development)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Submission Details
- **OpenAI Build Week Project**
- **Branch**: `phase-6-final-release`
- **Target Deployment**: Vercel Cloud Server
- **License**: MIT
