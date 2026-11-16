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
    slug: "snowed",
    name: "SnowEd",
    type: "Mobile productivity",
    summary:
      "An offline-capable student scheduler that brings classes, rich notes, and photo attachments into one focused mobile workspace.",
    tags: ["React Native", "Expo", "SQLite"],
    mockupKey: "snowed",
    color: "blue",
    githubUrl: "https://github.com/rmfsantos0704",
    order: 1,
  },
  {
    slug: "owlet",
    name: "Owlet",
    type: "Research platform",
    summary:
      "A collaborative research workspace for clipping, citing, and verifying evidence—with semantic search and AI-assisted briefs.",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    mockupKey: "owlet",
    color: "orange",
    githubUrl: "https://github.com/rmfsantos0704",
    order: 2,
  },
  {
    slug: "lox",
    name: "LOX",
    type: "Developer tooling",
    summary:
      "An autonomous CLI that reads Git changes, generates conventional commits offline, and automates semantic versioning.",
    tags: ["Node.js", "Ollama", "Git", "Llama 3.2"],
    mockupKey: "lox",
    color: "lime",
    githubUrl: "https://github.com/rmfsantos0704",
    order: 3,
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
    s("JavaScript", "javascript", "languages", 4, "The language I reach for across the stack: browser UIs, Node services, CLIs, and extensions.", ["snowed", "owlet", "lox"]),
    s("Java", "java", "languages", 3, "Object-oriented fundamentals and structured application design from my coursework."),
    s("PHP", "php", "languages", 3, "Server-side development with Laravel, including my on-the-job training at Bataeno Pass."),
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
    s("Laravel", "laravel", "backend-data", 3, "Full-stack features with Livewire, NFC hardware integration, and OAuth at Bataeno Pass."),
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
  c(5, "nodejs-backend-ibm", "Back-End Apps with Node.js & Express", "IBM", null,
    "Focuses on building server-side applications with Node.js and Express, including REST APIs, routing, middleware, and asynchronous programming.",
    ["Node.js and Express", "REST API design", "Asynchronous programming"]),
  c(6, "powerpoint-associate", "PowerPoint Associate", "Certiport", "Microsoft Office Specialist",
    "Shows the ability to create and format effective presentations: slides, transitions, media, and collaborative features.",
    ["Slide design and layout", "Media and transitions", "Presentation delivery"]),
  c(7, "excel-associate", "Excel Associate", "Certiport", "Microsoft Office Specialist",
    "Shows proficiency organizing and analyzing data in spreadsheets with formulas, functions, formatting, and charts.",
    ["Formulas and functions", "Data formatting", "Charts and analysis"]),
  c(8, "word-associate", "Word Associate", "Certiport", "Microsoft Office Specialist",
    "Shows the ability to create and manage professional documents with consistent formatting, tables, references, and collaboration tools.",
    ["Document formatting", "Tables and references", "Review and collaboration"]),
];
