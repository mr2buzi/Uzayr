import type {
  CvBlock,
  EducationItem,
  ExperienceItem,
  InfoPanel,
  ModeCopy,
  Project,
  ProjectTag,
  SecondaryProject,
  SkillGroup,
} from "../types";

export const modeLabels = {
  plain: "Plain English",
  balanced: "Balanced",
  technical: "Deep Dive",
} as const;

export const allProjectTags: Array<{ value: ProjectTag | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "systems", label: "Systems" },
  { value: "ai-data", label: "AI/Data" },
  { value: "full-stack", label: "Full Stack" },
  { value: "embedded", label: "Embedded" },
  { value: "security", label: "Security" },
  { value: "automation", label: "Automation" },
];

export const heroCopy: Record<"headline" | "subline" | "summary", ModeCopy> = {
  headline: {
    plain: "I am a software engineering student (AI & Systems) seeking a placement where shipping real work matters.",
    balanced:
      "I am a second-year computer science student building placement-ready work across systems, AI, backend platforms, and product execution.",
    technical:
      "I focus on AI-integrated systems, storage engines, reliability tooling, backend services, and performance-aware product builds.",
  },
  subline: {
    plain: "I build projects that are easy for recruiters to scan and strong enough for engineers to interrogate.",
    balanced:
      "My portfolio is built around interviewable systems: durable workflows, a Rust database engine, ML-backed fraud tooling, and product-oriented full stack work.",
    technical:
      "The strongest work here spans Rust services, WAL-backed persistence, typed frontend dashboards, explainable ML pipelines, and Python simulation tooling.",
  },
  summary: {
    plain:
      "I am based in Cardiff, studying Computer Science, and looking for a year-in-industry role in software, backend, AI, or systems-leaning teams.",
    balanced:
      "I am a Cardiff University computer science student with hands-on experience in Python, C, Rust, TypeScript, React, FastAPI, SQL, embedded tooling, and AI experimentation.",
    technical:
      "My current interests are reliability engineering, backend systems, AI-assisted products, performance-aware software, developer tooling, and explainable data workflows.",
  },
};

export const proofStrip = [
  { value: "5", label: "flagship case studies" },
  { value: "Rust / Python / TS", label: "core stack" },
  { value: "First", label: "current university grade" },
  { value: "2024-present", label: "industry-facing work" },
];

export const projects: Project[] = [
  {
    slug: "relay-flow",
    title: "Relay-Flow",
    accent: "signal",
    heroLabel: "Hero Project",
    tags: ["systems", "full-stack", "automation"],
    role: "I designed and built this as a developer-first execution engine for AI and API workflows.",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "React", "Vite", "Docker Compose"],
    recruiterSummary:
      "I built this workflow platform to make API and AI automations reliable instead of fragile.",
    balancedSummary:
      "I built a full-stack workflow engine with retries, idempotent triggering, dead-letter recovery, branching, and a dashboard for debugging runs.",
    technicalSummary:
      "I built a Rust-based execution platform with persisted workflow versions, durable step history, at-least-once worker execution, replay controls, and deterministic branching.",
    whyItMatters: [
      {
        plain:
          "I built this around the boring parts that usually break automations: retries, duplicate requests, and hard-to-debug state.",
        balanced:
          "I used Relay-Flow to show backend and platform judgment by focusing on workflow durability, replayability, and operational clarity instead of just connecting APIs together.",
        technical:
          "The core value I focused on is execution reliability: published workflow versions, persisted run context, retry scheduling with backoff, idempotency controls, dead-letter capture, and deterministic replay.",
      },
      {
        plain:
          "It also reflects the kind of work I want to be hired for: backend, platform, and systems-flavoured product engineering.",
        balanced:
          "I kept it intentionally narrower than a full orchestration platform so the tradeoffs are easier to defend in interview discussion.",
        technical:
          "I deliberately chose sequential durable execution over a full DAG runtime, which kept branch replay and recovery semantics easier to reason about.",
      },
    ],
    technicalDetail: [
      "Runs bind to published workflow versions instead of mutable drafts.",
      "An API service, worker, dashboard, and shared engine crate split responsibilities cleanly.",
      "Branch decisions are persisted in run context so retries do not re-decide control flow.",
      "Dead letters and replay create new runs rather than mutating history.",
      "The public demo stays mock-first so the repo remains reproducible without secrets.",
    ],
    tradeoffs: [
      "Sequential execution instead of full DAG scheduling.",
      "Mock connectors instead of secret-heavy live integrations.",
      "Local operational clarity over multi-tenant production scope.",
      "At-least-once behavior with idempotency rather than pretending to guarantee exactly-once delivery.",
    ],
    outcomeBullets: [
      {
        plain: "I turned a vague automation idea into a product with replay, failure handling, and operational visibility.",
        balanced:
          "I built a full demo flow covering normal execution, failure, dead-lettering, retry-now, replay, and branching.",
        technical:
          "I defined an execution model strong enough to discuss persistence, retries, branch determinism, and run lifecycle semantics with engineers.",
      },
      {
        plain: "I made the project strong enough to demo in 3 to 5 minutes.",
        balanced:
          "I added an interview-oriented README and demo workflows so the product is easy to present under time pressure.",
        technical:
          "Structured the repo around demoable flows like `user-signup` and `scrape-and-brief` to expose normal-path and failure-path behavior clearly.",
      },
    ],
    evidencePoints: [
      "Published workflow versions are separated from editable drafts.",
      "Retries, replay, dead letters, and branching are all part of the visible product story.",
      "The repo is strong for backend interviews because the failure model is explicit.",
    ],
    artifacts: [
      {
        kind: "architecture-snippet",
        title: "Execution model",
        summary: "Persisted workflow versions, sequential step execution, retries, replay, and dead-letter handling.",
        preview: "API -> Worker -> Postgres -> Dashboard",
      },
      {
        kind: "cli-example",
        title: "Local stack demo",
        summary: "Runs with Docker Compose and a seeded dashboard for interview demos.",
        preview: "docker compose up --build",
      },
      {
        kind: "metrics-result",
        title: "Interview value",
        summary: "Strongest portfolio signal for backend and platform roles because the reliability model is explicit.",
      },
    ],
    links: [{ label: "GitHub repository", href: "https://github.com/mr2buzi/Relay-Flow" }],
  },
  {
    slug: "slatedb",
    title: "SlateDB",
    accent: "ember",
    heroLabel: "Systems Case Study",
    tags: ["systems", "full-stack"],
    role: "I built a Rust relational database prototype and paired it with an Electron + React workbench.",
    stack: ["Rust", "Electron", "React", "TypeScript", "B+ Trees", "WAL", "SQL Parser"],
    recruiterSummary:
      "I built a custom database engine with a desktop UI for inspecting how queries are planned and executed.",
    balancedSummary:
      "I built a systems-heavy project combining handwritten SQL parsing, page-based storage, indexing, transactions, and an Electron workbench for engine visibility.",
    technicalSummary:
      "I built a single-process relational database in Rust with heap pages, row IDs, one-column B+ tree indexes, planner decisions, transactional execution, and WAL-backed crash recovery.",
    whyItMatters: [
      {
        plain:
          "This is the project I use to prove I can build lower-level systems, not only web apps.",
        balanced:
          "With SlateDB I demonstrate storage engine thinking: parsing, planning, persistence, indexing, recovery, and a UI that exposes real engine output rather than fake diagrams.",
        technical:
          "The interesting signal is not the desktop shell. It is the engine design I implemented: parser, planner, pager, heap row layout, B+ tree indexing, savepoints, WAL replay, and deterministic inspection paths.",
      },
      {
        plain:
          "It also helps in interviews because I can show how data moves through the engine step by step.",
        balanced:
          "I paired the engine with a workbench to make a systems project more accessible while still keeping the real engine behavior front-and-centre.",
        technical:
          "Electron calls into the real Rust runtime through a bridge, so the UI reflects actual ASTs, plans, stats, schema state, and rows instead of mocked planner output.",
      },
    ],
    technicalDetail: [
      "Handwritten parser supports a deliberate SQL subset including CREATE, INSERT, UPDATE, SELECT, EXPLAIN, BEGIN, and ROLLBACK.",
      "Heap storage uses pages and slot directories with `RowId { page_id, slot_id }` addressing.",
      "Indexes are single-column B+ trees for equality and single-bound range scans.",
      "Planner chooses index or sequential scan based on predicate shape and indexed column type.",
      "Recovery uses physical page-image logging and WAL replay after restart.",
    ],
    tradeoffs: [
      "Single-process and single-writer only.",
      "No joins, no NULL support, and a deliberately small SQL surface area.",
      "Simpler physical WAL model instead of a more advanced redo/undo design.",
      "Electron workbench prioritizes inspectability over packaging polish.",
    ],
    outcomeBullets: [
      {
        plain: "I built a project that stands out from standard student portfolios because the core engine is original.",
        balanced:
          "I combined low-level engine work with a polished enough UI to make the system demoable without hiding the technical core.",
        technical:
          "I exposed planner, executor, pager, transaction, and recovery behavior through a desktop workbench backed by the real engine.",
      },
      {
        plain: "I created a strong story for systems, backend, and infrastructure interviews.",
        balanced:
          "I added tests around parser correctness, persistence, update semantics, planner choices, savepoints, rollback, and WAL recovery.",
        technical:
          "The engine test surface covers parser behavior, restart persistence, tombstones, index maintenance, LIMIT handling, transaction rollback, savepoints, and crash recovery paths.",
      },
    ],
    evidencePoints: [
      "Real parser, planner, pager, and WAL concepts are implemented rather than mocked.",
      "Electron acts as an inspection surface for the actual engine output.",
      "Strongest systems signal in the portfolio for infrastructure-leaning interviews.",
    ],
    artifacts: [
      {
        kind: "architecture-snippet",
        title: "Engine composition",
        summary: "Parser, planner, pager, storage layer, indexes, and Electron workbench.",
        preview: "Parser -> Planner -> Executor -> Pager -> WAL",
      },
      {
        kind: "cli-example",
        title: "Engine verification",
        summary: "Rust tests verify persistence, rollback, planner, and WAL behaviour.",
        preview: "cd engine && cargo test",
      },
      {
        kind: "metrics-result",
        title: "Interview strength",
        summary: "Best project for showing systems depth, scope control, and technical tradeoff awareness.",
      },
    ],
    links: [
      { label: "GitHub repository", href: "https://github.com/mr2buzi/Database-Control-Room" },
    ],
  },
  {
    slug: "fraudshield",
    title: "FraudShield",
    accent: "charcoal",
    heroLabel: "AI + Backend",
    tags: ["ai-data", "full-stack", "automation"],
    role: "I built this as a bank-style fraud detection platform combining ML scoring with analyst workflows.",
    stack: ["FastAPI", "SQLAlchemy", "React", "TypeScript", "scikit-learn", "SQLite", "PostgreSQL", "Docker"],
    recruiterSummary:
      "I built an end-to-end fraud operations demo that scores transactions and gives analysts a workflow to review risk.",
    balancedSummary:
      "I built a full-stack platform where an ML-generated risk score feeds alerts, analyst decisions, metrics, and operational visibility.",
    technicalSummary:
      "I built a FastAPI + React + scikit-learn system with versioned model artifacts, explainable scores, alert lifecycle handling, deterministic demo seeding, and local or Docker deployment paths.",
    whyItMatters: [
      {
        plain: "This is not just a notebook. I used it to show how an AI model becomes part of a real product workflow.",
        balanced:
          "I built FraudShield to combine backend engineering, frontend design, data flow, and explainability so the project feels like a product instead of a disconnected ML demo.",
        technical:
          "I treated the model as one piece of a larger service: scoring, persistence, alert thresholds, review decisions, metrics, drift indicators, and deterministic startup data.",
      },
      {
        plain:
          "It is especially useful for roles that want proof I can connect data work to usable software.",
        balanced:
          "The most valuable signal is the analyst loop I implemented: score, explain, alert, review, measure, improve.",
        technical:
          "I used exported metadata to keep the scoring path lightweight and inspectable instead of hiding behavior inside a heavier black-box runtime bundle.",
      },
    ],
    technicalDetail: [
      "Scores transactions through a REST API and returns risk score, band, model version, latency, and top contributing factors.",
      "Persists transactions and opens alerts automatically when configured thresholds are crossed.",
      "Supports analyst decisions such as fraud, legitimate, or escalate.",
      "Frontend is split into focused workspaces for overview, alerts, scoring, and ops.",
      "ML pipeline generates a versioned model artifact and supports local retraining checks.",
    ],
    tradeoffs: [
      "Uses synthetic deterministic fraud-style data instead of pretending to have access to real bank data.",
      "Keeps authentication light in v1 to prioritise product and engineering flow.",
      "Uses SQLite locally for low-friction setup while also supporting PostgreSQL in Docker Compose.",
      "Starts with a logistic regression baseline to keep the scoring path explainable.",
    ],
    outcomeBullets: [
      {
        plain: "I showed that I can turn ML ideas into software people can actually use.",
        balanced:
          "I built one repo that covers API design, frontend review workflows, model integration, deployment, and testing.",
        technical:
          "I defined a versioned, inspectable scoring service with seeded demo data, analyst state transitions, backend tests, frontend tests, and CI paths.",
      },
      {
        plain: "I made the project credible for interviews by focusing on workflows, not hype.",
        balanced:
          "The platform is designed around triage, auditability, explainability, and operational metrics rather than only chasing model accuracy.",
        technical:
          "Operational endpoints and analyst decision history make the system discussable as a productised ML service, not an isolated classifier.",
      },
    ],
    evidencePoints: [
      "Shows that model output is integrated into an analyst decision loop rather than left in a notebook.",
      "Covers backend API design, frontend workspaces, model packaging, and local deployment.",
      "Useful for AI, backend, and product-focused software roles.",
    ],
    artifacts: [
      {
        kind: "api-example",
        title: "Score response",
        summary: "Returns transaction ID, alert ID, risk score, risk band, top factors, model version, and latency.",
        preview: "POST /api/v1/transactions/score -> risk_score: 0.9132",
      },
      {
        kind: "architecture-snippet",
        title: "Platform layout",
        summary: "Backend, frontend, ML pipeline, CI workflow, and Docker Compose path.",
        preview: "FastAPI + React + ML artifact + DB",
      },
      {
        kind: "cli-example",
        title: "Local launch path",
        summary: "Includes PowerShell helpers plus per-service startup commands for demoing.",
        preview: ".\\scripts\\start-local.ps1",
      },
    ],
    links: [{ label: "GitHub repository", href: "https://github.com/mr2buzi/Fraud-Detector-" }],
  },
  {
    slug: "deadline",
    title: "DEADLINE",
    accent: "signal",
    heroLabel: "Shipped Product",
    tags: ["full-stack", "automation"],
    role: "I shaped this as a product-oriented accountability app with a public live experience.",
    stack: ["Live web app", "Product UX", "Account flows", "Pricing", "Static simulations"],
    recruiterSummary:
      "I built this live product concept around turning plans into visible progress through accountability and structured pressure.",
    balancedSummary:
      "I shipped this web product with onboarding, pricing, example lifecycle simulation, and accountability-focused UX.",
    technicalSummary:
      "I shipped this as a publicly deployed product case study with live landing, signup, pricing, and static outcome-flow simulation pages, and I present it here as a product and UX build until repo access is public.",
    whyItMatters: [
      {
        plain:
          "This project proves I can ship something public and think about product positioning, not only code internals.",
        balanced:
          "Even without a public repo, I can use the live app to show positioning, onboarding, product voice, feature packaging, and case-study framing.",
        technical:
          "The current public evidence is the live deployment: landing page messaging, tiered pricing, signup flow, and a static lifecycle simulation that explains the product model clearly.",
      },
      {
        plain: "I use it to balance the portfolio by showing a product-minded side alongside the heavier systems work.",
        balanced:
          "I treat it as a lighter case study here because the implementation repo is not publicly accessible yet.",
        technical:
          "I frame DEADLINE honestly as a product and UX case study first, with technical depth capped until private implementation detail becomes shareable.",
      },
    ],
    technicalDetail: [
      "Public pages include landing, signup, pricing, and a static example-flow walkthrough.",
      "The pricing model differentiates tiers through increasing accountability and recovery depth.",
      "The example page simulates a deadline lifecycle from declaration through debrief and scoreboard updates.",
      "The signup path includes email, password, public handle, and optional phone number fields.",
      "The current public record is enough to discuss product structure, onboarding, and messaging decisions.",
    ],
    tradeoffs: [
      "Technical detail is intentionally limited because the repository is not publicly accessible.",
      "This case study leans product and UX heavier than the other flagship projects.",
      "Portfolio messaging avoids pretending to show internals that are not public.",
      "It stays useful by focusing on shipped behaviour and product framing.",
    ],
    outcomeBullets: [
      {
        plain: "I used this project to show that I can put a real product in front of users, not just keep work inside GitHub.",
        balanced:
          "I added public product evidence to a portfolio that would otherwise skew heavily toward technical demos.",
        technical:
          "I use it as live proof of product architecture at the UX level: acquisition pages, monetisation framing, onboarding, and model explanation through simulation.",
      },
      {
        plain: "It helps recruiters see a broader range than just systems engineering.",
        balanced:
          "I think it makes the portfolio more hireable because it shows both platform depth and product instinct.",
        technical:
          "I use it as a deliberate counterweight to the Rust and ML case studies by showing public-facing product execution.",
      },
    ],
    evidencePoints: [
      "Public evidence includes landing, signup, pricing, and an example lifecycle simulation.",
      "This case study is intentionally honest about the current level of public technical detail.",
      "Best evidence here is product framing, onboarding quality, and public deployment.",
    ],
    artifacts: [
      {
        kind: "live-demo",
        title: "Public deployment",
        summary: "Landing, pricing, and onboarding pages are available live.",
        href: "https://deadline-dun-seven.vercel.app/",
      },
      {
        kind: "screenshot",
        title: "Lifecycle simulation",
        summary: "The example flow walks through declare, lock, countdown, resolve, and debrief states.",
        preview: "Outcome model simulation",
      },
      {
        kind: "metrics-result",
        title: "Portfolio role",
        summary: "Best case study for shipped product framing and public proof of execution.",
      },
    ],
    links: [
      { label: "Live product", href: "https://deadline-dun-seven.vercel.app/" },
      { label: "Pricing page", href: "https://deadline-dun-seven.vercel.app/pricing" },
      { label: "Example flow", href: "https://deadline-dun-seven.vercel.app/example" },
    ],
    embed: {
      title: "Live preview",
      href: "https://deadline-dun-seven.vercel.app/example",
      caption: "Embedded public example flow from the live DEADLINE deployment.",
    },
  },
  {
    slug: "vehicle-dynamics-simulation",
    title: "Vehicle Dynamics Simulation",
    accent: "ember",
    heroLabel: "Python Engineering Build",
    tags: ["systems", "automation"],
    role: "I built this as a Python vehicle acceleration simulator with both GUI and CLI demo paths.",
    stack: ["Python", "Tkinter", "NumPy", "SciPy", "Matplotlib", "ReportLab", "unittest"],
    recruiterSummary:
      "I built this car performance simulator to estimate acceleration, top speed, and traction behaviour.",
    balancedSummary:
      "I built a modular Python simulation project combining physics modelling, a GUI, a CLI, tests, and PDF report generation.",
    technicalSummary:
      "I built a longitudinal vehicle dynamics simulator with validated parameters, a small solver stack, traction modelling, a reusable simulation core, and generated engineering reports.",
    whyItMatters: [
      {
        plain:
          "This project shows I can do more than websites: I can model a system, validate inputs, and present results.",
        balanced:
          "I use it as a strong engineering project because it combines domain modelling, architecture refactoring, automation, and presentation output in one repo.",
        technical:
          "The useful signal is the split I created between typed config, engineering model, metrics extraction, CLI, GUI, and report generation rather than keeping everything in one script.",
      },
      {
        plain:
          "It is also easy for me to demo because the same simulation works through a desktop app and command line.",
        balanced:
          "That dual interface makes the core model reusable and interview-friendly.",
        technical:
          "I refactored the simulation kernel away from UI concerns and headless execution, which makes testing and scenario overrides far easier.",
      },
    ],
    technicalDetail: [
      "Simulates straight-line longitudinal dynamics and produces 0-60 mph, top-speed, acceleration, and slip outputs.",
      "Uses validated parameter objects and a dedicated engineering model module.",
      "Supports both Tkinter GUI interaction and CLI overrides for repeatable runs.",
      "Generates a PDF report with charts and rendered equations.",
      "Includes regression coverage for config and model behaviour.",
    ],
    tradeoffs: [
      "Focuses on longitudinal dynamics only, not full vehicle handling.",
      "No detailed suspension, thermal tyre behaviour, or real-world calibration pipeline.",
      "Packaging and CI are still deliberately light.",
      "The bounded coupling and low-speed safeguards prioritise numerical stability over full realism.",
    ],
    outcomeBullets: [
      {
        plain: "I turned a technical modelling idea into something presentable and runnable.",
        balanced:
          "I refactored a monolithic script into a reusable package with tests, CLI support, and clearer module boundaries.",
        technical:
          "Separated validated parameter types, solver logic, report generation, and presentation layers to improve testability and discussion quality.",
      },
      {
        plain: "I added another interview angle beyond web and backend work.",
        balanced:
          "Shows that I can think in terms of modelling, constraints, and numerical robustness as well as product UX.",
        technical:
          "The project surfaces engineering decisions around slip handling, drivetrain coupling, load-sensitive traction, and generated artifact management.",
      },
    ],
    evidencePoints: [
      "The same simulation core works in both GUI and CLI contexts.",
      "A generated PDF report makes the output presentable, not just technically correct.",
      "Strong supporting project for modelling, testing, and architecture refactoring discussions.",
    ],
    artifacts: [
      {
        kind: "cli-example",
        title: "Headless run path",
        summary: "Supports repeatable scenario overrides through a CLI module.",
        preview: "python -m vehicle_sim.cli --set hp=850 --set mass=1450",
      },
      {
        kind: "metrics-result",
        title: "Output model",
        summary: "Produces 0-60 time, top-speed estimate, peak longitudinal g, and traction-limited percentage.",
      },
      {
        kind: "architecture-snippet",
        title: "Refactored package layout",
        summary: "Config, model, report, GUI, and CLI responsibilities are isolated.",
        preview: "vehicle_sim/config.py -> model.py -> report.py",
      },
    ],
    links: [{ label: "GitHub repository", href: "https://github.com/mr2buzi/Vehicle-Simulator" }],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Lureon",
    role: "Founder & Software Developer | Part-time",
    date: "2024 - Present",
    bullets: [
      {
        plain: "I run a small software development studio and turn ideas into working products.",
        balanced:
          "I lead system design, development, and deployment for data-driven software projects.",
        technical:
          "I own product scoping, architecture, implementation, and deployment across client-style and self-initiated builds.",
      },
      {
        plain: "I use the studio as a vehicle for building portfolio-grade systems and product work.",
        balanced:
          "I treat Lureon as a parallel lane for shipping, positioning, and presenting software work publicly.",
        technical:
          "I keep the studio brand alongside my personal portfolio rather than using it to replace it, which signals both engineering output and product initiative.",
      },
    ],
  },
  {
    company: "IoT Tech Solutions",
    role: "Software Developer | Part-time",
    date: "2023 - 2024",
    bullets: [
      {
        plain: "I helped improve legacy systems, testing practices, and internal automation.",
        balanced:
          "I migrated Python 2 code to Python 3, worked within Scrum and Kanban workflows, and automated manual file-management tasks.",
        technical:
          "I worked across Python migration, LDRA-based testing and static analysis, AES-128 research, and automation that reduced internal manual overhead by roughly 60%.",
      },
      {
        plain: "I also explored AI tracking models and compared how they performed.",
        balanced: "I benchmarked YOLOv8 against GOTURN in Google Colab and presented the findings.",
        technical:
          "I trained and evaluated object-tracking models with TensorFlow and YOLOv8 workflows, including performance comparison work targeted at high-FPS tracking scenarios.",
      },
    ],
  },
  {
    company: "Student Cribs",
    role: "Student Brands Manager | Part-time",
    date: "2024 - Present",
    bullets: [
      {
        plain: "I represent the brand directly to students through tours, outreach, and feedback gathering.",
        balanced:
          "I lead property tours, social campaigns, and on-campus promotion while feeding customer insight back into marketing.",
        technical:
          "This is not a coding role, but it gives me strong evidence of communication, presentation, and feedback-loop discipline that helps in client-facing and cross-functional engineering work.",
      },
    ],
  },
  {
    company: "World of Women",
    role: "Full Stack Web Developer | Part-time",
    date: "2023",
    bullets: [
      {
        plain: "I built a responsive website with authentication features and database-backed user flows.",
        balanced:
          "I developed front-end pages and secure sign-up flows using SASS, HTML5, CSS, XAMPP, SQL, PHP, and Bootstrap.",
        technical:
          "I implemented responsive UI and authentication logic in a classic PHP + SQL stack, using RAD-style iteration for faster feedback cycles.",
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: "Languages",
    title: "Core engineering tools",
    items: ["Python", "Rust", "TypeScript", "JavaScript", "C", "SQL", "Batch"],
  },
  {
    eyebrow: "Systems",
    title: "Backend and systems",
    items: ["Axum", "FastAPI", "SQLx", "SQLAlchemy", "PostgreSQL", "SQLite", "Docker Compose", "Git"],
  },
  {
    eyebrow: "AI / Data",
    title: "Modeling and analytics",
    items: ["TensorFlow", "YOLOv8", "scikit-learn", "Google Colab", "analytics pipelines", "Monte Carlo simulation"],
  },
  {
    eyebrow: "Frontend",
    title: "Product-facing UI",
    items: ["React", "Vite", "Electron", "SASS", "Bootstrap", "HTML5", "CSS"],
  },
  {
    eyebrow: "Embedded",
    title: "Hardware and low-level exposure",
    items: ["ESP32-CAM", "Arduino", "MPLAB X IDE", "Zephyr OS", "Linux", "nRF boards"],
  },
  {
    eyebrow: "Workflow",
    title: "Team and delivery habits",
    items: ["Agile", "Scrum", "Kanban", "Jira", "unit testing", "static analysis", "CI-aware repo structure"],
  },
];

export const education: EducationItem[] = [
  {
    institution: "Cardiff University",
    date: "2024 - Present",
    detail:
      "BSc Computer Science (Year in Industry). Modules include database systems, data processing & visualisation, scientific computing, algorithms, data structures, object orientation, and computational mathematics. Current grade: First.",
  },
  {
    institution: "St Peters RC Sixth Form",
    date: "2024",
    detail: "A Levels: Criminology A*, Computer Science C, Psychology C.",
  },
  {
    institution: "Ninestiles, an Academy",
    date: "2022",
    detail: "10 GCSEs including Maths, English, and Statistics at grade 6 and above.",
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    title: "Smart Home Surveillance System",
    tag: "embedded",
    summary: {
      plain: "I built a smart home system using sensors, Arduino, ESP32-CAM, and Python to react to environmental changes.",
      balanced:
        "I combined motion and sound sensing with Python, Arduino, ESP32-CAM, and breadboard components to demonstrate real-time environmental control and surveillance.",
      technical:
        "I built an embedded prototype integrating Python, Arduino, ESP32-CAM, motion and sound sensors, and camera-driven monitoring into a small real-time control setup.",
    },
  },
  {
    title: "Cybersecurity Automation Tool",
    tag: "security",
    summary: {
      plain: "I created a tool that brings common security checks together into one workflow.",
      balanced:
        "I developed a cybersecurity utility that integrated penetration-testing tools with Batch and Python for faster threat detection and network assessment.",
      technical:
        "I built automation-oriented security tooling that orchestrated penetration-testing workflows through Batch and Python to improve repeatability and reduce manual steps.",
    },
  },
  {
    title: "Automation Interaction Prototype",
    tag: "automation",
    summary: {
      plain: "I built an automation prototype to study how large-scale user interactions could be simulated ethically.",
      balanced:
        "I developed a Selenium + Python prototype for studying large-scale interaction patterns and automation flows.",
      technical:
        "I built a browser automation prototype using Selenium and Python to model repeatable interaction patterns while keeping the project framed as ethical research and learning work.",
    },
  },
  {
    title: "Monte Carlo Options Simulation",
    tag: "ai-data",
    summary: {
      plain: "I used AI-assisted workflows to explore options pricing through simulation.",
      balanced:
        "I applied AI-supported methods to run Monte Carlo simulations for options pricing and scenario analysis.",
      technical:
        "I used Monte Carlo simulation workflows for options pricing as data and modelling practice rather than production finance tooling.",
    },
  },
  {
    title: "Leadership, Public Speaking, and Community Work",
    tag: "full-stack",
    summary: {
      plain: "I have led tours, volunteered in public-facing roles, and completed leadership training through RAF Cadets and community organisations.",
      balanced:
        "My experience includes ACP and National Trust volunteering, guided tours, public speaking, first aid certification, event coordination, and leadership courses through RAF Cadets.",
      technical:
        "This non-technical experience strengthens my interview performance and delivery confidence through public presentation, operational reliability, event coordination, and calm communication under structure.",
    },
  },
];

export const contactLinks = [
  { label: "Email", value: "[redacted-email]", href: "mailto:[redacted-email]" },
  { label: "Phone", value: "[redacted-phone]", href: "tel:[redacted-phone]" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/uzayr-qureshi-b2a8ba245",
    href: "https://www.linkedin.com/in/uzayr-qureshi-b2a8ba245/",
  },
  { label: "GitHub", value: "github.com/mr2buzi", href: "https://github.com/mr2buzi" },
  { label: "Portfolio", value: "uzayr.netlify.app", href: "https://uzayr.netlify.app/" },
  { label: "Lureon", value: "lureon.dev", href: "https://www.lureon.dev" },
];

export const infoPanels: InfoPanel[] = [
  {
    eyebrow: "Objective",
    title: "What I am looking for",
    body: {
      plain:
        "I am looking for a placement where I can contribute to real software, learn fast, and keep building a portfolio that stands up in interviews.",
      balanced:
        "I am looking for a year-in-industry placement where I can contribute to technically demanding software while growing in backend, systems, AI, or product-oriented engineering.",
      technical:
        "The best fit is a placement with meaningful engineering ownership across backend systems, AI-integrated products, infrastructure, or performance-aware software.",
    },
  },
  {
    eyebrow: "Modules",
    title: "Current academic grounding",
    body: {
      plain:
        "My degree currently covers databases, algorithms, data processing, scientific computing, and object-oriented software design.",
      balanced:
        "Current university modules include database systems, computational mathematics, scientific computing, object orientation, algorithms and data structures, and data processing & visualisation.",
      technical:
        "The strongest academic overlap with my portfolio is in database systems, algorithms, scientific computing, computational mathematics, and data processing.",
    },
  },
  {
    eyebrow: "Courses",
    title: "Additional training",
    body: {
      plain:
        "I have also completed cybersecurity training and leadership courses outside the classroom.",
      balanced:
        "Additional training includes a six-month cybersecurity course funded by West Midlands Police, RAF Cadets leadership courses, first aid certification, and event coordination.",
      technical:
        "External training strengthens the portfolio on the security and operations side, while leadership and first-aid work add evidence of reliability under structure.",
    },
  },
  {
    eyebrow: "Outside work",
    title: "Discipline and interests",
    body: {
      plain:
        "Outside tech, I stay active through calisthenics and combat sports, and I keep building side projects because I like improving fast.",
      balanced:
        "Outside professional work, I stay active through calisthenics, swimming, boxing, and MMA, and I keep exploring technical projects and events as part of self-improvement.",
      technical:
        "The non-work signal here is discipline and long-term consistency: training, project-building, and public-facing community work all reinforce delivery habits.",
    },
  },
];

export const cvBlocks: CvBlock[] = [
  {
    eyebrow: "Contact",
    title: "Direct details",
    items: [
      "[redacted-phone]",
      "[redacted-email]",
      "linkedin.com/in/uzayr-qureshi-b2a8ba245",
      "uzayr.netlify.app",
      "lureon.dev",
    ],
  },
  {
    eyebrow: "Technical skills",
    title: "Core stack",
    items: [
      "Python, Rust, C, JavaScript, TypeScript, SQL, Batch",
      "React, Vite, Electron, FastAPI, Axum, SQLx, SQLAlchemy",
      "PostgreSQL, SQLite, Docker Compose, Git, Jira",
      "TensorFlow, YOLOv8, scikit-learn, Google Colab",
      "ESP32-CAM, Arduino, MPLAB X IDE, Zephyr OS, Linux",
    ],
  },
  {
    eyebrow: "Experience snapshot",
    title: "Most relevant roles",
    items: [
      "At Lureon, I founded and run a studio focused on shipping portfolio-grade products.",
      "At IoT Tech Solutions, I worked on Python migration, LDRA testing, AES-128 research, AI benchmarking, and automation.",
      "At World of Women, I built full stack web features using PHP, SQL, SASS, HTML, CSS, and Bootstrap.",
      "At Student Cribs, I developed public-facing communication through tours, outreach, and feedback loops.",
    ],
  },
  {
    eyebrow: "Project highlights",
    title: "Best interview anchors",
    items: [
      "Relay-Flow: I built workflow reliability around retries, replay, dead letters, and branching.",
      "SlateDB: I built a Rust storage engine with parsing, indexing, transactions, and WAL recovery.",
      "FraudShield: I built an ML-backed fraud operations platform with analyst workflows.",
      "DEADLINE: I shipped a live product case study with onboarding, pricing, and lifecycle demo flows.",
      "Vehicle Dynamics Simulation: I built Python modelling tools with a GUI/CLI split, tests, and PDF reports.",
    ],
  },
  {
    eyebrow: "Education",
    title: "Academic grounding",
    items: [
      "Cardiff University, BSc Computer Science (Year in Industry), current grade: First.",
      "Modules: databases, algorithms, scientific computing, data processing, computational mathematics.",
      "A Levels: Criminology A*, Computer Science C, Psychology C.",
    ],
  },
  {
    eyebrow: "Courses and extras",
    title: "Additional signal",
    items: [
      "Cybersecurity course funded by West Midlands Police.",
      "RAF Cadets leadership courses, first aid training, event coordination.",
      "Community tours, public speaking, and volunteering with ACP and the National Trust.",
      "References available upon request.",
    ],
  },
];
