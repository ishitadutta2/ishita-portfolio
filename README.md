# Ishita Dutta — Portfolio

A personal portfolio site for Ishita Dutta, a Computer Science undergraduate at Heritage
Institute of Technology, Kolkata, focused on AI, web development, and UI/UX design.

Built as a static site (no build step, no framework) — plain HTML, CSS, and JavaScript.

## Sections

- **Home** — intro, rotating role text, resume access
- **About** — journey, areas of interest, beyond academics, quick facts
- **Projects** — [MergeFlow](https://ishitadutta2.github.io/MergeFlow/), [Shrinkly](https://ishitadutta2.github.io/SHRINKLY/), and an AI mood-based entertainment recommender
- **Services** — what she works on (Web Developer, AI/ML Enthusiast, UI/UX Designer, Open Source Contributor)
- **Skills** — languages, web technologies, tools & AI
- **Education** — academic timeline
- **Experience** — GSSoC 2026 and other work
- **Certifications** — courses completed
- **Contact** — contact info + a working message form

## Tech stack

- HTML5, CSS3 (custom properties, no framework)
- Vanilla JavaScript (no build tools required)
- [Remix Icon](https://remixicon.com/) for icons
- [Swiper](https://swiperjs.com/) for the projects carousel
- [Typed.js](https://github.com/mattboldt/typed.js/) for the rotating role text
- [ScrollReveal](https://scrollrevealjs.org/) for on-scroll animations
- [FormSubmit](https://formsubmit.co/) for the contact form (no backend needed)

## Project structure

```
.
├── index.html                 # main page
├── thank-you.html             # shown after a successful form submission (native fallback)
├── 404.html                   # custom not-found page
├── robots.txt
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/                   # favicon, profile photo
│   └── ishita-dutta-resume.pdf
└── README.md
```

## Running locally

No build step — just open `index.html` in a browser, or serve the folder for the most
accurate preview (some browsers restrict local file access for things like the resume
modal / form):

```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

This is a static site, so it works as-is on any static host: GitHub Pages, Netlify,
Vercel, etc. For GitHub Pages, push this folder to a repo and enable Pages on the
`main` branch (root).

## Contact form setup (important)

The contact form submits to [FormSubmit](https://formsubmit.co/) at
`duttaishita112@gmail.com` — no account or API key needed. One manual step is required
the first time:

1. Submit the form once after deploying (or use the button on the site).
2. FormSubmit sends an **activation email** to `duttaishita112@gmail.com` instead of
   forwarding that first message.
3. Open that email (check spam too) and click **Activate Form**.
4. Every submission after that is delivered normally, and the site's inline status
   message will accurately report success or failure.

The form also has a plain HTML `action`/`method` as a fallback, so it still works even
if JavaScript fails to load — it just won't show the inline status message in that case.

## Customizing

- **Colors** — edit the `--hue` and related custom properties at the top of
  `assets/css/styles.css`.
- **Content** — all copy lives directly in `index.html`; sections are clearly commented.
- **Resume** — replace `assets/ishita-dutta-resume.pdf` with an updated file (same name).

## Contact

- Email: duttaishita112@gmail.com
- GitHub: [ishitadutta2](https://github.com/ishitadutta2)
- LinkedIn: [ishita-dutta-202510396](https://linkedin.com/in/ishita-dutta-202510396/)
