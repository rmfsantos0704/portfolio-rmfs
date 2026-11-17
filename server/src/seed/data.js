// Source of truth for the portfolio content. Edit here, then run `npm run seed`.
// NOTE: skill `level` values and certification descriptions are drafts —
// adjust them so they reflect you accurately.

export const profile = {
  name: "Russel Santos",
  headline: "I build software that feels simple.",
  availability: "Available for opportunities",
  intro:
    "I’m Russel Santos, a full-stack developer turning complex ideas into reliable web and mobile experiences.",
  bio: [
    "I’m a Computer Science student and developer who enjoys making ambitious ideas work in the real world.",
    "My work spans the MERN stack, Laravel ecosystem, and React Native. I care as much about reliable behavior and rigorous testing as I do about a polished interface.",
    "When I’m not building, I’m usually exploring better developer workflows, learning a new tool, or finding ways to make software more useful.",
  ],
  email: "santosrussel0704@gmail.com",
  phone: "+63 945 119 1938",
  location: "Orani, Bataan · PH (UTC+8)",
  socials: {
    github: "https://github.com/rmfsantos0704",
    linkedin: "https://www.linkedin.com/in/russel-santos-36720b3a3/",
  },
  experience: [
    {
      role: "On-the-Job Trainee",
      company: "Bataeno Pass",
      period: "Jan — Apr 2026",
      summary:
        "Engineered full-stack Laravel and Livewire features, integrated physical NFC scanning, improved real-time state, and stabilized OAuth database integrations.",
    },
  ],
  education: [
    {
      degree: "BS Computer Science",
      major: "Major in Software Development",
      school: "Bataan Peninsula State University",
      graduation: "Graduating July 2026",
    },
  ],
};

export const projects = [
  {
    slug: "bataeno-pass",
    name: "Bataeno Pass",
    type: "Digital ID integration",
    summary:
      "Bridging the gap between software and physical IDs. Implemented OAuth 2.0 and custom Python NFC reader bridges for local government efficiency.",
    techStack: ["Laravel Reverb", "Python", "OAuth 2.0", "WebSockets"],
    deviceType: "desktop",
    logo: "/logos/bataeno-pass.png",
    watermark: "NFC",
    role: "On-the-Job Trainee · Jan – Apr 2026",
    theme: {
      accent: "#2457f5",
      secondary: "#12b8d4",
      highlight: "#a4e900",
      dark: {
        title: "#a4e900",
        backdrop: "#06113f",
        pageBackground: "#050d2d",
        pageSurface: "#0b1d5a",
        pageText: "#f7fbff",
        pageMuted: "#b8c9ee",
      },
      light: {
        title: "#1f46d8",
        backdrop: "#dbe6ff",
        pageBackground: "#eef3ff",
        pageSurface: "#ffffff",
        pageText: "#071b70",
        pageMuted: "#4a5f9a",
      },
    },
    challenge:
      "The local government needed a way to verify physical resident IDs instantly without manual data entry or slow database queries.",
    solution:
      "Engineered a custom Python script to act as a bridge between physical USB NFC readers and a Laravel backend. Used Laravel Reverb to broadcast the scan data to the web interface in real-time.",
    screenshots: [
      "/BataenoPass/Screenshot 2026-04-03 094810.png",
      "/BataenoPass/Screenshot 2026-04-03 094357.png",
      "/BataenoPass/Screenshot 2026-04-03 092435.png",
      "/BataenoPass/Screenshot 2026-04-03 092417.png",
      "/BataenoPass/Screenshot 2026-04-03 092239.png",
      "/BataenoPass/Screenshot 2026-04-03 091859.png",
    ],
    order: 1,
  },
  {
    slug: "snowed",
    name: "SnowEd",
    type: "Mobile app • Planner",
    summary:
      "A mobile scheduler and note-taking app for students. It helps users track courses, deadlines, and completion status while keeping note-taking photo-first.",
    techStack: ["React Native", "Firebase", "Expo", "Push Notifications"],
    deviceType: "mobile",
    logo: "/logos/snowed.png",
    watermark: "SNOW",
    theme: {
      accent: "#3d91d8",
      secondary: "#0b4e86",
      highlight: "#98FCFC",
      dark: {
        title: "#98FCFC",
        backdrop: "#0a2036",
        pageBackground: "#07182b",
        pageSurface: "#0d2640",
        pageText: "#eaf4ff",
        pageMuted: "#8fb3d4",
      },
      light: {
        title: "#0b4e86",
        backdrop: "#d9eaff",
        pageBackground: "#d9eaff",
        pageSurface: "#f5faff",
        pageText: "#0b4e86",
        pageMuted: "#366890",
      },
    },
    liveUrl: "https://snowed-landing.vercel.app/",
    githubUrl: "https://github.com/rmfsantos0704/nurse-scheduler-app",
    challenge:
      "Students needed a single place to track coursework, deadlines, and lecture notes without juggling multiple disconnected apps.",
    solution:
      "Built a mobile scheduler with a photo-first notes system, letting students snap and organize notes alongside a calendar view of classes, deadlines, and completion status.",
    screenshots: [
      "/SnowEd/calendar.jpeg",
      "/SnowEd/Courses.jpeg",
      "/SnowEd/Notes.jpeg",
      "/SnowEd/Reminders.jpeg",
      "/SnowEd/research.jpeg",
      "/SnowEd/today.jpeg",
    ],
    order: 2,
  },

  {
    slug: "lox",
    name: "LOX",
    type: "CLI tool • AI git commits",
    summary:
      "An autonomous CLI tool that reads your git diff, groups unrelated changes, and writes strict, granular Conventional Commits using a 100% free local AI model — no API keys, no cost, no rate limits.",
    techStack: ["Node.js", "Ollama (Local AI)", "Inquirer.js", "Git CLI", "Few-Shot Prompting"],
    // "terminal" shows the screenshots in a terminal window instead of a browser window.
    deviceType: "terminal",
    logo: "/logos/lox-cli.png",
    watermark: "LOX",
    theme: {
      accent: "#f97316",
      secondary: "#c2410c",
      highlight: "#fb923c",
      dark: {
        title: "#fb923c",
        backdrop: "#120a05",
        pageBackground: "#120a05",
        pageSurface: "#1f130b",
        pageText: "#fff3ea",
        pageMuted: "#c9a186",
      },
      light: {
        title: "#c2410c",
        backdrop: "#ffe6d2",
        pageBackground: "#fff4ea",
        pageSurface: "#ffffff",
        pageText: "#2a1507",
        pageMuted: "#8a5a38",
      },
    },
    githubUrl: "https://github.com/rmfsantos0704/lox-cli",
    challenge:
      "Developers often bundle unrelated changes — a bug fix, a doc tweak, a new feature — into a single vague commit message, making history hard to read and bisect later.",
    solution:
      "Built a Node.js CLI that parses `git status`/`git diff` output, categorizes files into commit types (feat, fix, docs, refactor, test, chore, style) using path rules, status flags, and a regex comment interceptor, then sends each diff to a local Ollama model with Few-Shot prompting to generate clean, imperative commit descriptions. Each group is staged and committed independently in one run, with interactive file filtering, a workspace status preview, a semantic-versioning release helper, and automated changelog generation layered on top.",
    sdlc: [
      { phase: "Planning", description: "Scoped the problem of mixed, vague commits and defined a feature set: multi-commit grouping, local AI descriptions, versioning, and changelog automation, with zero paid dependencies." },
      { phase: "Design", description: "Designed the file-categorization rules (path/status/diff heuristics) and the Few-Shot prompt templates that keep local AI output focused on imperative, hallucination-free summaries." },
      { phase: "Development", description: "Built the CLI commands (commit, status, log, release, changelog, config) around Git plumbing commands and a local Ollama integration, with `.loxrc.json` for per-project configuration." },
      { phase: "Testing", description: "Tested categorization accuracy across mixed-change scenarios, verified interactive prompts and pre-commit safety checks, and validated semantic version bumps against real commit histories." },
      { phase: "Deployment & Maintenance", description: "Published via npm link for global CLI installation, with ongoing refinement of prompt accuracy and model support based on usage feedback." },
    ],
    screenshots: [
      "/lox-cli/Screenshot-1.png",
      "/lox-cli/Screenshot-2.png",
      "/lox-cli/Screenshot-3.png",
      "/lox-cli/Screenshot-4.png",
      "/lox-cli/Screenshot-5.png",
      "/lox-cli/Screenshot-6.png",
      "/lox-cli/Screenshot-7.png",
      "/lox-cli/Screenshot-8.png",
    ],
    order: 4,
  },
    {
    slug: "owlet",
    name: "Owlet",
    type: "Web app • Research platform",
    summary:
      "A research workspace for students and researchers. Clip web pages and PDFs into collections, highlight passages on the original PDF, keep citations next to every source, and share collections with classmates. Includes a Chrome extension and optional AI tools.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Chrome Extension", "PWA"],
    deviceType: "desktop",
    logo: "/logos/owlet.png",
    watermark: "OWLET",
    theme: {
      accent: "#3971ff",
      secondary: "#79a2ff",
      highlight: "#b8ccff",
      dark: {
        title: "#79a2ff",
        backdrop: "#10204d",
        pageBackground: "#070b17",
        pageSurface: "#0d1527",
        pageText: "#f4f7ff",
        pageMuted: "#a4aec4",
      },
      light: {
        title: "#2c5fe6",
        backdrop: "#dfe8ff",
        pageBackground: "#f3f6ff",
        pageSurface: "#ffffff",
        pageText: "#0b1328",
        pageMuted: "#4a5670",
      },
    },
    liveUrl: "https://owlet-nine.vercel.app/",
    githubUrl: "https://github.com/rmfsantos0704",
    challenge:
      "Research ends up scattered across open tabs, downloaded PDFs, and separate notes and citation tools, which makes it hard to find a passage again or work on sources with a group.",
    solution:
      "Built a full-stack app with a Chrome extension and an installable web app. Pages and PDFs go into shared collections with roles and join links. PDFs open in an in-app reader where highlights are drawn directly on the original page. Every source gets APA, MLA and Chicago citations. An evidence board, a literature matrix and cited research briefs help turn sources into writing. AI summaries, briefs and concept search are optional, have a daily limit per account, and each user can switch them off.",
    screenshots: [
      "/Owlet/Screenshot 2026-11-17 104440.png", // Library
      "/Owlet/Screenshot 2026-11-17 104448.png", // Literature matrix
      "/Owlet/Screenshot 2026-11-17 104456.png", // Research briefs
      "/Owlet/Screenshot 2026-11-17 104501.png", // Evidence board
      "/Owlet/Screenshot 2026-11-17 104507.png", // Highlights
      "/Owlet/Screenshot 2026-11-17 104513.png", // Comments
    ],
    // phone screenshots: shown in a phone frame instead of the browser window (needs the small change below)
    mobileScreenshots: [
      "/Owlet/1c33038d-1832-4063-89de-5b4161ad52d4.jpeg", // PDF reader: selecting text to highlight
      "/Owlet/cbdf7747-9237-4645-a3dc-e3bdfc2a661c.jpeg", // PDF reader: highlights and the selection bar
      "/Owlet/88cc014d-574e-44fb-bd61-c3c2ac4e06a8.jpeg", // Library
      "/Owlet/24abe0a7-09c3-4e2a-918a-c4c4f36f9ea3.jpeg", // Literature matrix
      "/Owlet/6964f698-6a90-40d8-9a53-3cd3000a8aac.jpeg", // Research briefs
      "/Owlet/fb1f58a0-ca4b-4180-9971-973c114eaad8.jpeg", // Evidence board
      "/Owlet/a6195bc6-8f96-4769-8bbf-3d21ef59c5e2.jpeg", // AI workspace
      "/Owlet/aff2b546-19e8-4dd9-99ec-a6918c45dcb4.jpeg", // Concept search
    ],
    order: 5,
  },
];

const s = (name, slug, category, level, summary, usedIn = []) => ({
  name,
  slug,
  category,
  level,
  summary,
  usedIn,
});

const withOrder = (list) => list.map((skill, index) => ({ ...skill, order: index + 1 }));

export const skills = [
  ...withOrder([
    s("TypeScript", "typescript", "languages", 4, "Typed JavaScript for safer React and Node codebases — my default for anything that will grow.", ["snowed", "owlet"]),
    s("JavaScript", "javascript", "languages", 4, "The language I reach for across the stack: browser UIs, Node services, CLIs, and extensions.", ["snowed", "owlet", "lox", "bataeno-pass"]),
    s("Java", "java", "languages", 3, "Object-oriented fundamentals and structured application design from my coursework."),
    s("PHP", "php", "languages", 3, "Server-side development with Laravel, including my on-the-job training at Bataeno Pass.", ["bataeno-pass"]),
  ]),
  ...withOrder([
    s("React.js", "react", "frontend", 4, "Component-driven UIs with hooks, routing, and clean state management.", ["owlet"]),
    s("Next.js", "nextjs", "frontend", 3, "File-based routing and server rendering for fast, SEO-friendly sites."),
    s("Tailwind CSS", "tailwind", "frontend", 4, "Utility-first styling for building consistent, responsive interfaces quickly."),
    s("HTML", "html", "frontend", 4, "Semantic, accessible markup — backed by an IT Specialist HTML & CSS certification."),
    s("PDF.js", "pdfjs", "frontend", 3, "Rendering and extracting content from PDFs in the browser for research tooling.", ["owlet"]),
  ]),
  ...withOrder([
    s("Node.js", "nodejs", "backend-data", 4, "APIs, tooling, and CLIs — including the offline commit-message automation in LOX.", ["owlet", "lox"]),
    s("Express.js", "express", "backend-data", 4, "Lean REST APIs with clear routing, middleware, and error handling.", ["owlet"]),
    s("Laravel", "laravel", "backend-data", 3, "Full-stack features with Livewire, NFC hardware integration, and OAuth at Bataeno Pass.", ["bataeno-pass"]),
    s("MongoDB", "mongodb", "backend-data", 4, "Document modeling and indexing with Mongoose for flexible, evolving data.", ["owlet"]),
    s("MySQL", "mysql", "backend-data", 3, "Relational schema design and queries for structured, transactional data."),
    s("SQLite", "sqlite", "backend-data", 3, "On-device storage that keeps mobile apps fast and usable offline.", ["snowed"]),
  ]),
  ...withOrder([
    s("Git & GitHub", "git", "tools", 4, "Branching, reviews, and conventional commits — the workflow LOX automates.", ["lox"]),
    s("React Native", "react-native", "tools", 4, "Cross-platform mobile apps with native-feeling navigation and gestures.", ["snowed"]),
    s("Expo", "expo", "tools", 4, "Fast mobile iteration, device APIs, and simple build/deploy pipelines.", ["snowed"]),
    s("Vercel", "vercel", "tools", 3, "Zero-config deployments and preview URLs for frontend projects."),
    s("Chrome Extensions", "chrome-extensions", "tools", 3, "Browser extensions that capture content and sync with a web app.", ["owlet"]),
  ]),
];

const c = (order, slug, title, issuer, program, description, highlights) => ({
  order,
  slug,
  title,
  issuer,
  program,
  description,
  highlights,
  imageUrl: `/certificates/${slug}.png`,
});

export const certifications = [
  c(1, "html-css", "HTML & CSS", "Certiport", "IT Specialist",
    "Validates foundational skills for building and styling web pages with modern HTML and CSS, including structure, layout, and responsive design.",
    ["Semantic HTML structure", "CSS styling and layout", "Responsive page building"]),
  c(2, "cybersecurity", "Cybersecurity", "Certiport", "IT Specialist",
    "Covers core security concepts such as threats and vulnerabilities, secure practices, authentication, and protecting systems and data.",
    ["Security fundamentals", "Threats and risk awareness", "Safe-computing practices"]),
  c(3, "software-development", "Software Development", "Certiport", "IT Specialist",
    "Demonstrates fundamentals of software development: programming logic, object-oriented concepts, debugging, and the development lifecycle.",
    ["Programming fundamentals", "Object-oriented concepts", "Debugging and testing basics"]),
  c(4, "digital-literacy", "Digital Literacy", "Certiport", "IC3",
    "Confirms core computing skills: working with devices and operating systems, using the internet safely, and applying common software.",
    ["Computing fundamentals", "Internet and online safety", "Everyday productivity software"]),
  c(5, "html5-application-development", "HTML5 Application Development", "Certiport", "IT Specialist",
    "Validates the skills to build interactive web applications with HTML5, CSS, and JavaScript. Awarded April 16, 2026.",
    ["HTML5 markup and structure", "CSS formatting and layout", "JavaScript-driven interactivity"]),
  c(6, "javascript", "JavaScript", "Certiport", "IT Specialist",
    "Validates core JavaScript programming skills, from language fundamentals to working with the page and its events. Awarded April 16, 2026.",
    ["Variables, data types, and control flow", "Functions, objects, and arrays", "DOM manipulation and events"]),
  c(7, "powerpoint-associate", "PowerPoint Associate", "Certiport", "Microsoft Office Specialist",
    "Shows the ability to create and format effective presentations: slides, transitions, media, and collaborative features. Part of the Microsoft Office Specialist – Associate (Microsoft 365 Apps) certificate, awarded November 6, 2025.",
    ["Slide design and layout", "Media and transitions", "Presentation delivery"]),
  c(8, "excel-associate", "Excel Associate", "Certiport", "Microsoft Office Specialist",
    "Shows proficiency organizing and analyzing data in spreadsheets with formulas, functions, formatting, and charts. Part of the Microsoft Office Specialist – Associate (Microsoft 365 Apps) certificate, awarded November 6, 2025.",
    ["Formulas and functions", "Data formatting", "Charts and analysis"]),
  c(9, "word-associate", "Word Associate", "Certiport", "Microsoft Office Specialist",
    "Shows the ability to create and manage professional documents with consistent formatting, tables, references, and collaboration tools. Part of the Microsoft Office Specialist – Associate (Microsoft 365 Apps) certificate, awarded November 6, 2025.",
    ["Document formatting", "Tables and references", "Review and collaboration"]),
];
