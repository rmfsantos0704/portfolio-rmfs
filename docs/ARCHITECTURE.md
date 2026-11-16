# Portfolio Architecture

MERN monorepo: a React (Vite + TypeScript + Tailwind) client and an Express + MongoDB API, managed with npm workspaces.

## 1. Directory architecture

```
portfolio/
├── package.json                 # npm workspaces + root scripts (dev, build, seed)
├── docs/ARCHITECTURE.md         # this file
├── client/                      # React SPA
│   ├── index.html
│   ├── vite.config.ts           # dev proxy: /api -> http://localhost:5000
│   ├── public/                  # static files served as-is:
│   │   ├── certificates/        #   <slug>.png certificate images
│   │   ├── logos/               #   project logos (bataeno-pass.png, snowed.png, ...)
│   │   └── BataenoPass/ SnowEd/ TatAI/ lox-cli/   # project screenshots
│   └── src/
│       ├── main.tsx             # providers + CSS entry
│       ├── App.tsx              # route table
│       ├── index.css            # Figma styles (ported as-is)
│       ├── styles/              # skills, certifications, states, theme (light-mode overrides; load last)
│       ├── types/               # shared TS interfaces mirroring API shapes
│       ├── services/api.ts      # the only place that calls fetch()
│       ├── hooks/useApi.ts      # loading / error / data wrapper
│       ├── lib/projectUi.ts     # per-project theme variables, mockup address text
│       ├── context/             # ProfileContext (fetched once), ThemeContext (light/dark)
│       ├── pages/               # one file per route (incl. ProjectDetailPage)
│       └── components/
│           ├── layout/          # Layout, Navbar, Footer
│           ├── common/          # PageView, SectionHeading, Loading/Error states
│           ├── home/            # ContactStrip
│           ├── projects/        # ProjectCard, DeviceMockup, ScreenshotShowcase
│           ├── skills/          # SkillsExplorer, SkillDetail, skillMeta
│           ├── certifications/  # CertificationList, CertificationItem (accordion)
│           └── ui/              # Icon
└── server/                      # Express API
    ├── .env.example
    └── src/
        ├── index.js             # boot: connect DB, listen
        ├── app.js               # middleware + route mounting
        ├── config/              # env.js, db.js
        ├── models/              # Mongoose schemas
        ├── controllers/         # request handlers
        ├── routes/              # URL -> controller mapping
        ├── middleware/          # notFound, errorHandler
        ├── utils/               # asyncHandler
        └── seed/                # data.js (content source of truth) + seed.js
```

**Layering rule (server):** `routes → controllers → models`. Routes never touch the DB; controllers never parse URLs.
**Layering rule (client):** `pages → components → hooks → services`. Only `services/api.ts` knows the API exists.

## 2. System architecture

```
 Browser (React SPA, React Router)
        │  fetch /api/*
        ▼
 Vite dev proxy (dev)  /  VITE_API_URL (prod)
        │
        ▼
 Express API ── helmet · cors · morgan · json
        │   routes → controllers → Mongoose models
        ▼
 MongoDB  (profile, skills, certifications, projects)
```

- **Content lives in MongoDB**, not in components. Adding a certification or skill = edit `server/src/seed/data.js` and re-run `npm run seed` (an admin UI can replace this later).
- **Certificate images** are static files in `client/public/certificates/`, referenced by `imageUrl` (`/certificates/<slug>.png`). Until a file exists the UI shows a dashed placeholder (the `onError` fallback), so you can add images with no code or DB change.
- **Dev:** two processes (`npm run dev`). **Prod:** deploy `client/dist` to a static host (Vercel/Netlify) and the API to Render/Railway/Fly, with MongoDB Atlas. Set `VITE_API_URL` on the client and `CLIENT_ORIGIN` on the server.
- The SPA needs a catch-all rewrite to `index.html` on the static host (Vercel: `rewrites`).

### API

| Method | Path                    | Returns                                  |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/api/health`           | `{ status, db }`                         |
| GET    | `/api/profile`          | `{ data: Profile }`                      |
| GET    | `/api/skills`           | `{ data: Skill[] }` (`?category=` filter) |
| GET    | `/api/certifications`   | `{ data: Certification[] }`              |
| GET    | `/api/projects`         | `{ data: Project[] }`                    |
| GET    | `/api/projects/:slug`   | `{ data: Project }` (project detail page) |

Errors: `{ "error": "message" }` with an appropriate status.

### Theming (light / dark)

- Dark is the Figma design (`index.css`). Light mode lives in `styles/theme.css` under `:root[data-theme="light"]`: it redefines the colour variables and overrides colours that were hardcoded in the Figma CSS.
- `data-theme` is set on `<html>` by an inline script in `index.html` before first paint (saved choice in `localStorage`, otherwise the OS preference), so there is no flash. `ThemeContext` keeps it in sync and the navbar `ThemeToggle` flips it.
- Intentionally the same in both themes: the code card, and the blue education card (project pages follow the toggle with their own palettes).
- To theme a new component, use the CSS variables (`--ink`, `--paper`, `--blue`, `--line`, `--surface`, `--text-muted`…) instead of hex codes, or add a light override in `theme.css`.

## 3. Database architecture (MongoDB / Mongoose)

Four collections; no joins needed. The only cross-reference is `Skill.usedIn[]` holding project **slugs**.

**profile** (singleton)
`name, headline, availability, intro, bio[], email, phone, location, socials{github, linkedin}, experience[{role, company, period, summary}], education[{degree, major, school, graduation}]`

**skills**
`name, slug (unique), category (languages | frontend | backend-data | tools), level 1–5, summary, usedIn[projectSlug], order` — index `{category, order}`

**certifications**
`title, slug (unique), issuer, program, description, highlights[], imageUrl, credentialUrl, issuedAt, order`

**projects**
`slug (unique), name, type, summary, techStack[], deviceType (desktop | mobile | terminal), logo, screenshots[], theme{accent, secondary, highlight, dark{title, backdrop, pageBackground, pageSurface, pageText, pageMuted}, light{...same}}, watermark, role, challenge, solution, sdlc[{phase, description}], liveUrl, githubUrl, order`
Screenshot and logo values are paths under `client/public` (e.g. `/SnowEd/calendar.jpeg`). `challenge`, `solution`, `sdlc`, `role` are optional; the detail page hides any section that is empty.

### Why these choices
- **Slugs as stable keys** — used for URLs (`/projects/:slug`), image filenames, and the skill↔project link, so reordering never breaks anything.
- **`order` field** — display order is data, not array position in code.
- **Profile as one document** — one read serves nav, footer, home, and about.
- **Embedded experience/education** — they have no life outside the profile.

## 4. Project pages

- `/projects` lists the projects as cards. Each card shows the first screenshot inside a device frame on the project's own backdrop colour.
- `/projects/:slug` is `ProjectDetailPage`: hero, screenshot slideshow (`ScreenshotShowcase`), challenge/solution, optional process timeline, tech stack, previous/next project.
- **Mockups:** `DeviceMockup` wraps a screenshot in a browser (`desktop`), phone (`mobile`) or terminal (`terminal`) frame. A missing image shows a "Screenshot coming soon" placeholder, so a page works before its files exist.
- **Per-project colours:** `themeVars()` (lib/projectUi.ts) turns `Project.theme` into `--pd-*` CSS variables on the page wrapper; the styles in `styles/project-detail.css` only use those variables, `theme.dark` or `theme.light` is picked from the site's current mode (`useTheme()`), so each project has its own dark and light palette and switches live with the toggle. Old flat themes are copied to both modes by `normalizeTheme()` in `services/api.ts`. Button text colour is chosen automatically for contrast.
- **Adding a project:** add an entry to `projects` in `server/src/seed/data.js`, put its images in `client/public/<Folder>/`, run `npm run seed`.
