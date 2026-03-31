# Memory: Security Review & Remediation Log

This file summarizes the security and maintainability review performed on this repository and records the remediation changes that were implemented.

## Repository snapshot
- **Type**: Create React App (CRA) portfolio site
- **Primary config/content**: `src/portfolio.js`
- **Build-time data generation**: `fetch.js` writes `public/profile.json` (GitHub GraphQL response) when `USE_GITHUB_DATA=true`
- **Runtime data usage**: client fetches `/profile.json` and optionally `/blogs.json`

## Threat model (practical)
This is a public static portfolio site, so the main security goals are:
- Prevent **XSS** (especially through embeds, future dynamic content, or DOM APIs)
- Prevent **reverse tabnabbing** and unsafe external navigation
- Avoid accidental **secret leakage** (GitHub token during build)
- Keep builds **reproducible** (Docker / dependency install behavior)

## Findings (pre-remediation)

### High risk patterns
1. **Unsafe DOM mutation using `innerHTML`**
   - `src/containers/twitter-embed/twitter.js`
   - Imperatively writing to `element.innerHTML` bypassed React and is a common XSS footgun.

2. **Reverse tabnabbing risk**
   - `window.open(url, "_blank")` without `noopener/noreferrer` in:
     - `src/components/achievementCard/AchievementCard.js`
     - `src/components/blogCard/BlogCard.js`
     - `src/components/githubRepoCard/GithubRepoCard.js`
     - `src/containers/StartupProjects/StartupProject.js`
   - Also `_blank` anchor support in `src/components/button/Button.js` lacked `rel`.

3. **Ambiguous secret naming & GraphQL string interpolation**
   - `fetch.js` used `REACT_APP_GITHUB_TOKEN` which is conventionally *client-exposed* in CRA.
   - Username was interpolated into the query string.

### Maintainability / correctness issues
1. **String booleans in config**
   - `src/portfolio.js` used values like `"true"` / `"false"`.
   - Code compared against string literals throughout the app.

2. **Mutation of imported config objects and props**
   - `src/containers/profile/Profile.js` mutated `openSource.showGithubProfile` at runtime.
   - `src/containers/blogs/Blogs.js` mutated `blogSection.displayMediumBlogs` at runtime.
   - `src/components/githubProfileCard/GithubProfileCard.js` mutated `prof.hireable`.

3. **Imperative DOM access / global window hooks**
   - `src/containers/topbutton/Top.js` used `window.onscroll/window.onload` and `getElementById`.

4. **Dockerfile was dev-oriented & non-reproducible**
   - `npm install` without lock copy + `npm audit fix` during image build.
   - Ran `npm start` in container instead of serving static build output.

## Remediations implemented

### A) XSS surface reduction (removed `innerHTML` usage)
- **File**: `src/containers/twitter-embed/twitter.js`
  - Replaced `innerHTML` manipulation with React state.
  - Implemented a timeout-based fallback UI when the Twitter iframe doesn’t load (common with privacy settings).

### B) Safe external navigation + URL validation
- **File**: `src/utils.js`
  - Added:
    - `sanitizeUrl(rawUrl, allowedProtocols)` – blocks invalid URLs and disallowed protocols (e.g. `javascript:`).
    - `openExternalLink(rawUrl, name)` – opens with `noopener,noreferrer` and nulls `opener`.

- Updated components to use `openExternalLink`:
  - `src/components/achievementCard/AchievementCard.js`
  - `src/components/blogCard/BlogCard.js`
  - `src/components/githubRepoCard/GithubRepoCard.js`
  - `src/containers/StartupProjects/StartupProject.js`

- **File**: `src/components/button/Button.js`
  - Adds `rel="noopener noreferrer"` when `newTab` is enabled.
  - Sanitizes `href` before rendering.

### C) Normalize config booleans + remove runtime mutations
- **File**: `src/portfolio.js`
  - Converted to booleans:
    - `openSource.showGithubProfile: false`
    - `blogSection.displayMediumBlogs: true`

- **File**: `src/containers/profile/Profile.js`
  - Removed mutation of `openSource`.
  - Uses component state (`showGithubProfile`) and robust fetch error handling.

- **File**: `src/containers/blogs/Blogs.js`
  - Removed mutation of `blogSection`.
  - Uses `mediumError` state for fallbacks.

- **File**: `src/components/githubProfileCard/GithubProfileCard.js`
  - Removed mutation of `prof` prop.
  - Uses derived `hireableText`.

### D) DOM-event hygiene
- **File**: `src/containers/topbutton/Top.js`
  - Replaced `window.onscroll`/`window.onload` with `addEventListener` + cleanup.
  - Eliminated `getElementById` style toggling in favor of React state.
  - Added smooth scrolling.

### E) Build-time GitHub fetch hardening
- **File**: `fetch.js`
  - Preferred secret name: `GITHUB_TOKEN` (fallback to `REACT_APP_GITHUB_TOKEN` for backward compatibility).
  - Validates token when `USE_GITHUB_DATA=true`.
  - Uses GraphQL variables instead of username interpolation.

- **File**: `env.example`
  - Updated to document `GITHUB_TOKEN`.

### F) Production-friendly Dockerfile
- **File**: `Dockerfile`
  - Replaced with multi-stage build:
    - Build: `node:20-alpine`, `npm ci`, `npm run build`
    - Runtime: `nginx:alpine` serving `/usr/share/nginx/html`
  - Exposes port 80.

### G) Test stability fixes discovered during verification
- **File**: `src/components/experienceCard/ExperienceCard.js`
  - `colorthief` could require native `sharp` in node/Jest; switched to dynamic import.

- **File**: `src/containers/Main.js`
  - Guarded `window.matchMedia` usage to work under Jest/jsdom.

- **File**: `src/components/footer/Footer.js`
  - Removed unused imports flagged by eslint.

### H) Experience card expand/collapse UX + scroll fixes
- **Issue**: expanding an experience card showed a large blank pane and the details text rendered outside the card border.
- **Files**:
  - `src/components/experienceCard/ExperienceCard.scss`
    - Switched the v2 card root to a `flex` column layout so the card height grows with content.
    - Prevented the summary section from forcing `min-height: 100%` in the expanded state (this was creating the blank space).
    - Unset the `aspect-ratio` on expanded cards so borders wrap revealed content consistently across browsers.
    - Made the expanded details section scrollable for long content:
      - `max-height: min(55vh, 420px)`
      - `overflow-y: auto` + `-webkit-overflow-scrolling: touch`
    - Updated expanded-card behavior inside the Experiences CSS grid so the card also expands **horizontally** and pushes other experiences down:
      - `grid-column: 1 / -1`
      - `justify-self: stretch`
  - `src/components/experienceCard/ExperienceCard.js`
    - Stopped click/key events inside the details pane from bubbling to the card container, so users can scroll/select/copy text without collapsing the card.

## Verification
- `npm test -- --watchAll=false` ✅ passes
- `npm run build` ✅ passes
- `npm audit` ⚠️ **blocked** because current npm registry does not support audit endpoints.
  - Registry detected: `https://registry.npmjs.org/typescript/-/typescript-4.9.5.tgz`

## Known follow-ups (recommended)
1. **Dependency modernization**
   - React 16.x and Enzyme are legacy; consider migrating to React 18+ and React Testing Library.

2. **Run audit using a registry that supports it**
   - Temporarily:
     - `npm config set registry https://registry.npmjs.org/`
     - `npm audit`
   - Then revert if your environment requires the internal proxy.

3. **Content Security Policy (CSP) and security headers**
   - For GitHub Pages you can’t set response headers directly, but you can:
     - reduce third-party scripts
     - self-host assets where possible
     - consider moving hosting to a platform that supports headers (Netlify, Cloudflare Pages, etc.)

4. **External link UX**
   - Some cards use clickable `div/span` for navigation; consider converting to semantic `<a>` with proper aria labels.
