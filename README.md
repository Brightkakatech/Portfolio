# Bright Amalahu Digital Portfolio

This is my personal portfolio website. I built it with React for the CS5709 Software Engineering Evolution module at the University of Limerick. This is the first version (Phase 1), and I plan to keep improving it in the next phases.

Live site: https://brightkakatech.github.io/Portfolio/

Source code: https://github.com/Brightkakatech/Portfolio

## What the site is for

The site shows who I am, my education, my skills and some of my interests. I also wanted it to be easy to change later, because the module is about how software changes over time after it is released.

## What I used

- React for building the pages as components
- Vite to run the project while developing and to build it for the web
- React Router to move between pages without reloading
- react-markdown to show this README on the Readme page
- Plain CSS for the styling
- Git and GitHub for version control
- GitHub Actions and GitHub Pages to build and publish the site automatically

## How to run it on your computer

1. Install Node.js (the LTS version).
2. Download or clone this repository and open the folder.
3. Run `npm install` to install everything the project needs.
4. Run `npm run dev` and open the address that shows in the terminal.

## How the project is organised

These are the main files and folders:

    my-portfolio/
    ├── .github/workflows/deploy.yml   builds and publishes the site
    ├── public/
    │   ├── images/                    profile photo and gallery pictures
    │   └── videos/                    videos for the Video Gallery
    ├── src/
    │   ├── components/                Navbar and Footer (shown on every page)
    │   ├── data/                      the text and lists used by the pages
    │   ├── pages/                     one file for each page
    │   ├── App.jsx                    connects each web address to its page
    │   ├── main.jsx                   starts the React app
    │   └── index.css                  all the styling
    ├── index.html                     the main HTML file and the browser tab title
    ├── README.md                      this file
    └── vite.config.js                 build settings, including the base path for GitHub Pages

## Pages

- Home: a short introduction with buttons to the About and Messages pages
- About: my photo, my story, some quick facts and my interests
- Education: my qualifications shown as cards, newest first
- Professional Knowledge: my skills in groups, and my work experience
- Pictures Gallery: a grid of photos, and clicking one opens a bigger view
- Video Gallery: videos you can play on the page
- Blog: posts you can read, and a form to publish or delete posts
- Messages: my contact links and a simple chat box
- Readme: this document

## Why I built it this way

I split the site into small components. Each page has its own file, and the Navbar and Footer are separate so they can be reused on every page. When I need to change something, I know exactly which file to open.

I kept the content in the data folder instead of writing it straight into the pages. For example, to add a new qualification I only edit education.js, and the Education page updates by itself.

I used HashRouter instead of BrowserRouter. GitHub Pages only serves plain files, so with BrowserRouter, refreshing a page like /about gives a 404 error. With HashRouter the addresses look like /#/about and they keep working.

All the colours are saved as CSS variables at the top of index.css. When I changed the colour scheme to navy and gold, I only had to edit a few lines.

The layout uses Flexbox and Grid so it works on both phones and laptops. I also tried to make the site accessible, for example by adding alt text to images, labels on the form fields, and making the gallery work with the keyboard.

This README is also what the Readme page shows, so I only have to update it in one place.

## How it is deployed

Every time I push to the main branch on GitHub, a GitHub Actions workflow installs the packages, builds the site and publishes it on GitHub Pages. If the build fails, the old version stays online, so a broken version never goes live.

## Known problems

The Blog and the chat on the Messages page save everything in the visitor's own browser (localStorage). This means other visitors cannot see posts or messages, and messages sent through the chat do not actually reach me. For now, the contact links are the real way to reach me.

## What I plan to add in Phase 2

- A shared online database (Firebase) so posts and messages are saved for everyone and update live
- A login so only I can publish blog posts and reply to messages
- Automatic tests and code checks in the GitHub Actions workflow
- Tidying up repeated code, for example making one reusable notification component for the Blog and Messages pages

## Version history

- Phase 1 (October 2026): first version with nine pages, navigation, styling and automatic deployment