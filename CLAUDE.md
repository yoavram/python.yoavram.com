# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The landing page for Yoav Ram's corporate Python / ML training (python.yoavram.com). It is a plain static site: everything served lives in `www/`. There is no build, test, or lint tooling in the repo, and no `netlify.toml`. Hosting is presumably Netlify with publish directory `www` (set in the Netlify UI, not verified). To preview, serve `www/` with any static server, e.g. `python -m http.server -d www`.

## Current structure (legacy 2016–2020 site)

- `www/index.html` is a single long page with a Bootstrap 3 navbar, a testimonial carousel, a tabbed course section (`#Py4Eng`, `#1DayPy`, `#MLDLPy`, `#Bayesian`), a contact form and footer. The course panels are inline tab panes, not separate pages.
- `www/Deep4Devs/` is a separate page with its own template (`css/agency.css`, `js/agency.js`, its own images and testimonials). It is not linked into the main stylesheet.
- `www/css/landing-page.css` holds the site's custom styles. Bootstrap 3.3.6, jQuery 2.2.1, Font Awesome 4.5 and html5shiv/respond.js load from CDNs, and `css/font-awesome-extension.min.css` is vendored.
- The contact form posts via AJAX to `//formspree.io/yoav@yoavram.com` and is broken (shows "Sending failed"). Analytics is Google Universal Analytics, which no longer collects data.

## Redesign plan (`plan.md`)

`plan.md` in the repo root is currently untracked. It specifies a two-PR redesign: PR 1 is copy only (`content/DRAFT.md`), and PR 2 is the implementation after copy approval. Read it before doing any redesign work. PR 1's output, `content/DRAFT.md` on branch `site-content`, is written and awaiting Yoav's copy review. Don't build HTML from it until it is approved. The constraints it records as already decided:

- No build step, no framework, no JavaScript, no Bootstrap or jQuery. Hand-written HTML plus one shared `www/css/site.css`.
- One site: Deep4Devs folds into `/modules/deep-learning/`, with `/deep4devs/` and `/Deep4Devs/` redirected through `www/_redirects`.
- Contact is `mailto:` only, with no form or backend. The address must also appear as plain text.
- No analytics.
- Don't invent content. No new testimonials, clients, numbers or credentials; use `TODO(Yoav): …` placeholders instead.
- Testimonials stay verbatim. Don't edit or elide quoted text.
- Don't pull copy from course repo READMEs. Repos may only be linked.
- Don't name version pins or fast-rotting tools (no "Python 3.x", Anaconda or specific coding-agent products) in copy.
- Show company names as text only, unless Yoav says to add logos.
- Confirm Netlify hosting before relying on `_redirects`.

The plan's acceptance checks, for after the redesign, are `html-validate` or `vnu`, `lychee www/`, `codespell www/ content/`, and a grep of `www/` for legacy tech (bootstrap, jquery, formspree, `<form`, `<script`, etc.).
