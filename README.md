# Shrink

A browser-based file compressor for PDFs and images.

## Live site

https://shrink.saharitam171.workers.dev/

## Licensing

The original Shrink source code and original application materials are proprietary and all rights are reserved by Ritam Saha. See `LICENSE.txt`.

This does **not** relicense third-party libraries used by the app. See `THIRD_PARTY_NOTICES.txt`.

## Repository structure

- `public/index.html` — licensed Shrink front-end
- `public/compress-pdf/` — PDF compression topic hub
- `public/compress-image/` — image compression topic hub
- `public/*/index.html` — search-focused compression landing pages
- `public/landing.css` — shared landing-page styles
- `public/landing.js` — shared landing-page interactions
- `public/robots.txt` — crawler rules for the deployed site
- `public/sitemap.xml` — XML sitemap for the deployed site
- `LICENSE.txt` — proprietary license for original Shrink materials
- `THIRD_PARTY_NOTICES.txt` — third-party dependency notices
- `wrangler.jsonc` — Cloudflare Workers static-assets configuration
- `shrink-ai-relay.gs` is intentionally not tracked in this public repository; keep the Apps Script backend private.

## Production notes

- The public production URL is the `workers.dev` address above.
- Google Search Console ownership has been verified for the production URL.
- The sitemap is published at `/sitemap.xml` and referenced by `robots.txt`.
- Keep the Apps Script backend, API keys, secrets, and other credentials out of the repository.
- If analytics, advertising, authentication, payments, or other data collection is added, update the privacy and terms documentation to reflect the actual behavior.
- Keep the third-party notices when distributing the project.

## Copyright notice

Copyright © 2026 Ritam Saha. All rights reserved.
