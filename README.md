# Bright Amalahu Digital Portfolio

This is my personal portfolio website. I built it for the CS5709 Software Engineering Evolution module at the University of Limerick. Phase 1 was a React website; in Phase 2 I improved it based on a peer review, converted it to TypeScript, connected it to a real database, and added automatic checks before every release.

Live site: https://brightkakatech.github.io/Portfolio/

Source code: https://github.com/Brightkakatech/Portfolio

## What the site is for

The site shows who I am, my education, my skills, my projects and my interests, and lets visitors contact me and take part in a small community blog. I also wanted it to be easy to change later, because the module is about how software changes over time after it is released.

## Features

- **Pages:** Home, About, Education, Professional Knowledge, Projects, Pictures Gallery, Video Gallery, Blog, Messages, Readme, Sign in, Search, and a "Page not found" page
- **Sign in:** with Google, or with an email and password (with email verification and password reset)
- **Messages:** visitors send me a private message, with an optional email address so I can reply. Only I can read the messages, in an Inbox that updates live, with "Reply by email" and Delete buttons
- **Community blog:** everyone can read posts; signed-in visitors with a verified email can write posts; authors can delete their own posts and I can remove any post
- **Search:** a search icon in the menu searches the whole site (pages, blog posts and GitHub projects); the Blog also has its own search box and author filter
- **Live GitHub projects:** the Projects page shows my latest repositories, loaded from the GitHub API (it got its own menu link after two testers looked for it there)
- **Animations:** cards fade in as you scroll (GSAP), and the Home page has a short entrance animation. Both are switched off for visitors who ask their device to reduce motion
- **Phone friendly:** on small screens the menu folds behind a ☰ button
- **Dark and light mode:** a sun/moon button in the menu; the site follows the device setting until the visitor chooses, and remembers the choice
- **Home page:** typewriter line with my roles, a Download CV button, and a "Right now in Limerick" card with an analogue clock, the time difference from the visitor, the visitor's own time and time zone, and live weather from the Open-Meteo API
- **Project filter:** language chips filter my GitHub projects; each skill links to the site search
- **Small touches:** press "/" anywhere to search, a back-to-top button on long pages, reading time on blog posts, and GitHub, LinkedIn and Medium icons in the footer

## What I used

- **React 19** for building the pages as components
- **TypeScript** (strict mode) so mistakes in data and props are found before the site runs
- **Vite** to run the project while developing and to build it for the web
- **React Router** (HashRouter) to move between pages without reloading
- **Firebase:** Authentication for sign-in, and Cloud Firestore as the database for messages and blog posts
- **GSAP** with ScrollTrigger for the scroll animations
- **react-markdown** to show this README on the Readme page
- **Vitest** for unit tests
- **ESLint** and **Prettier** to keep the code consistent
- **GitHub Actions**, **GitHub Pages**, **CodeQL** and **Dependabot** for automatic checks, publishing and security scanning

## How to run it on your computer

1. Install Node.js 22 (or newer LTS).
2. Clone this repository and open the folder.
3. Run `npm install` to install everything the project needs.
4. Run `npm run dev` and open the address that shows in the terminal.

### Useful commands

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Runs the site on your computer and reloads it as you edit |
| `npm run typecheck` | Checks the TypeScript types                               |
| `npm run lint`      | Checks the code with ESLint                               |
| `npm test`          | Runs the unit tests                                       |
| `npm run format`    | Formats every file with Prettier                          |
| `npm run build`     | Type-checks, then builds the site into the `dist` folder  |

## How the project is organised

    my-portfolio/
    ├── .github/workflows/deploy.yml   checks, builds and publishes the site
    ├── public/
    │   ├── data/                      page content as JSON files (about, education, ...)
    │   ├── images/                    profile photo and gallery pictures
    │   ├── videos/                    videos for the Video Gallery
    │   └── 404.html                   sends wrong addresses back into the site
    ├── src/
    │   ├── components/                parts shared by pages (Navbar, search, Inbox, ...)
    │   ├── context/                   who is signed in, shared with every page
    │   ├── hooks/                     reusable logic (loading JSON, animations, typewriter)
    │   ├── pages/                     one file for each page
    │   ├── services/                  talking to Firebase, GitHub, Open-Meteo and the browser storage
    │   ├── utils/                     small helpers with their unit tests (*.test.ts)
    │   ├── types.ts                   the shapes of all the data, used everywhere
    │   ├── App.tsx                    connects each web address to its page
    │   ├── main.tsx                   starts the React app
    │   └── index.css                  all the styling
    ├── firestore.rules                the database security rules
    ├── index.html                     the main HTML file, page title and description
    ├── tsconfig.json                  TypeScript settings
    └── vite.config.js                 build settings, including the base path for GitHub Pages

## Why I built it this way

**Separation of concerns.** Pages only show things. Anything that talks to the outside world (Firebase, GitHub, the browser's storage) is in `services`, and small pieces of logic are in `utils`. For example, if I moved from Firebase to another database, only the files in `services` would change.

**Content in JSON files.** The text of the About, Education, Professional Knowledge, gallery and contact sections is in `public/data`. The pages load it while the site runs, so I can update content without touching the code.

**TypeScript.** All the data shapes are in `src/types.ts`. TypeScript checks that every page, service and helper agrees on them. I chose TypeScript instead of PropTypes because React 19 no longer runs PropTypes checks. I use TypeScript 6 because the ESLint tools do not support TypeScript 7 yet.

**Security on the server, not just in the browser.** Buttons can be hidden in the browser, but anyone can get around the interface. So `firestore.rules` checks every request on Firebase's servers: only I can read messages, only signed-in users with a verified email can post, and authors can only delete their own posts. The rules also check the length and shape of the data and use the server's own clock for dates.

**Lazy loading.** Each page is downloaded only when it is first opened, and the database code only loads on the pages that need it. This cut the code downloaded on the first visit by about 61%.

**HashRouter.** GitHub Pages only serves plain files, so with normal addresses, refreshing a page like /about would give a 404 error. With HashRouter the addresses look like /#/about and keep working. `public/404.html` also catches addresses typed without the #.

**Accessibility.** Images have alt text, form fields have labels, status messages are announced to screen readers, the menu button says whether it is open, and animations respect the "reduce motion" setting.

## How it is tested and deployed

Every pull request into `main` runs a GitHub Actions workflow that checks, in order: formatting (Prettier), code quality (ESLint), types (TypeScript), unit tests (Vitest) and the production build. CodeQL also scans the code for security problems.

When a pull request is merged, the same checks run again on `main`, and the site is only published to GitHub Pages if every check passes. So a broken version never goes live.

## Version history

- **Phase 1 (October 2026):** first version with nine pages, navigation, styling and automatic deployment
- **Phase 2 (November 2026):** peer review fixes, TypeScript, Firebase sign-in and database, private Inbox with email replies, community blog, site-wide search and blog filter, GitHub API, JSON content, lazy loading, GSAP animations, phone menu, unit tests, CI/CD checks, CodeQL and Dependabot; then dark mode, CV download, analogue clock with live weather, project language filter, "/" search shortcut, back-to-top button, reading time and footer social icons

## Future improvements

- Replies inside the site, so visitors can see my answer on the Messages page without email
- Turning on Dependabot's automatic update pull requests
- Making the site installable on phones and usable offline (a PWA)
