# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The landing page for Yoav Ram's corporate Python / ML training (python.yoavram.com). It is hand-written static HTML with one shared stylesheet: no framework, no build step, no JavaScript. Everything served lives in `www/`. Hosting is Netlify (project `python-yoavram`) with publish directory `www`.

## Layout

- `www/index.html` is the home page: hero, about, clients, how I teach, workshop cards, testimonials, contact, footer.
- `www/modules/<slug>/index.html` is one page per workshop (eight). The site calls them "workshops" but the URL path is still `/modules/`. The pages share the same head, header and footer markup, copied by hand. When you change shared markup such as the nav or footer, change all nine pages.
- `www/js/gallery.js` is the only script, loaded by the home page only. It adds the testimonials gallery's previous, pause and next buttons and its auto-advance. Without it the gallery is a row you swipe or scroll.
- `www/css/site.css` is the only stylesheet. Colours are tokens on `:root`, and the dark theme follows `prefers-color-scheme`.
- `www/img/` keeps the portrait, `logo.png` (the Open Graph image) and the favicon set.
- `content/DRAFT.md` is the copy the site was first built from (untracked). The HTML is now the source of truth, so edit it directly. Keep `DRAFT.md` as a reference only if you want, and say so if the two diverge.

## Commands

```bash
python3 -m http.server -d www 8000          # preview at http://localhost:8000
npx html-validate "www/**/*.html"           # HTML validation
uvx codespell www content                   # spelling
grep -rniE "3\.8|anaconda|tensorflow|pymc3|kla-tencor|twitter|google-analytics|bootstrap|jquery|formspree|<form" www/
```

The grep must return nothing except Ofer Moshaioff's verbatim testimonial, which contains "TensorFlow" and is exempt. The only `<script>` on the site is the gallery script. `lychee` is not installed here, so links were checked with a throwaway script. LinkedIn answers bots with 999, and canonical URLs return 404 until the pages are deployed.

## Constraints (decided by Yoav)

- No build step, no framework, no forms or backend, and no analytics. JavaScript is limited to `www/js/gallery.js` (vanilla, about 70 lines, progressive enhancement). Yoav allowed it for the gallery buttons, overriding the plan's earlier "no JavaScript at all". Don't add other scripts without asking.
- Contact is a `mailto:` link only, with a prefilled subject and body. Every `mailto:` href is URL-encoded and uses `&amp;` in HTML. The address must also appear as plain text. Workshop pages put the workshop title in the subject.
- Don't invent content: no new testimonials, clients, numbers, credentials or outcomes. Use a visible `<mark class="todo">TODO(Yoav): …</mark>` instead.
- Testimonials stay verbatim. Don't edit, elide or "fix" quoted text. Short excerpts are allowed only as full sentences.
- Company names are text only. Yoav has no permission to show logos.
- Don't name version pins or fast-rotting tools in copy (no "Python 3.x", Anaconda or specific coding-agent products). Core libraries (NumPy, pandas, scikit-learn, Keras, JAX, PyMC) belong in workshop details only.
- Don't pull copy from course repo READMEs. Repos may be linked as sample materials.
- If a design need seems to require a framework, a build step or any JavaScript, stop and say why.

## Quality bar

HTML validates, Lighthouse mobile Accessibility and Performance are both at least 90 on `/`, and there is no horizontal scroll at phone widths. Check phone widths by loading the page in a 320px iframe, because headless Chrome will not go below a 500px window.
