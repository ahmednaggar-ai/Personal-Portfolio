# Ahmed Hossam — Personal Portfolio

Personal portfolio website of **Ahmed Hossam Al Naggar**, a Frontend Developer and Angular Specialist with 5+ years of experience building scalable, high-performance web applications with Angular and TypeScript.

**Live site:** https://ahmednaggar-ai.github.io/Personal-Portfolio

## Sections

- **About** — professional summary, personal info, and a downloadable CV
- **Skills** — frontend, UI libraries, testing, API, and tooling proficiency
- **Portfolio** — selected projects (Engaz HR, NAVI real estate, Engaz CRM, Gorgov, Rsquared, Hajj & Umrah), with a full list on [`portfolio-all.html`](portfolio-all.html)
- **Education & Certifications** — Ain Shams University, Route Academy, ITI, Udemy
- **Experience** — Engaz AI, World Trust Soft, Sortech A Technologies, Gorgov Digital Marketing Agency
- **Contact** — contact details and message form

## Tech

A static site with no build step: HTML5, CSS3, JavaScript, and jQuery, based on the Arlo / Elementor template. It includes SEO meta tags, Open Graph and Twitter cards, and JSON-LD structured data.

## Project structure

```
.
├── index.html            # Main one-page portfolio
├── portfolio-all.html    # Full projects page
└── assets/
    ├── css/              # Stylesheets, grouped by source (arlo, elementor, font-awesome, ...)
    ├── js/               # Scripts, grouped by source
    ├── fonts/            # Icon and web fonts
    ├── images/           # Profile and section images
    │   ├── projects/     # Project screenshots
    │   ├── theme/        # Images used by the theme CSS
    │   └── placeholders/
    ├── icons/            # SVG icons
    └── docs/             # Resume (PDF)
```

## Run locally

No install needed. Open `index.html` in a browser, or serve the folder so paths behave like they do on GitHub Pages:

```bash
npx serve .
# or
python -m http.server 8000
```

## Updating content

- **Text** (about, skills, experience, education): edit `index.html`.
- **Projects**: add the screenshot to `assets/images/projects/` and add a card in the Portfolio section of `index.html` and `portfolio-all.html`.
- **CV**: replace `assets/docs/Ahmed_Hossam_Frontend_Developer.pdf` (keep the file name, or update the "Download CV" link).

## Deployment

Hosted on GitHub Pages at the live URL above.

## Contact

- GitHub: [ahmednaggar-ai](https://github.com/ahmednaggar-ai)
- LinkedIn: [ahmedhossamnaggar](https://www.linkedin.com/in/ahmedhossamnaggar/)
- Email: ahossamnaggar@gmail.com
