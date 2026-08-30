# Shrink

A browser-based file compressor for PDFs and images, built around target-size workflows rather than arbitrary quality presets.

## Live site

https://shrink.saharitam171.workers.dev/

## Highlights

- Target-size compression for PDFs and images
- Client-side processing for the normal compression workflow
- Adaptive image encoding with JPEG, WebP, AVIF, and transparency-aware fallbacks where supported
- Page-by-page PDF rendering to reduce peak memory usage
- Batch compression with bounded concurrency
- SEO-focused task and size-specific landing pages
- Optional AI-assisted workflows kept separate from the normal local compression path

## Repository structure

- `public/index.html` — primary Shrink application
- `public/compress-pdf/` — PDF compression topic hub
- `public/compress-image/` — image compression topic hub
- `public/*/index.html` — search-focused compression landing pages
- `public/landing.css` — shared landing-page styles
- `public/landing.js` — shared landing-page interactions
- `public/robots.txt` — crawler rules for the deployed site
- `public/sitemap.xml` — XML sitemap for the deployed site
- `LICENSE.txt` — proprietary license for original Shrink materials
- `THIRD_PARTY_NOTICES.txt` — third-party software and service notices
- `SECURITY.md` — security reporting guidance
- `wrangler.jsonc` — Cloudflare Workers static-assets configuration
- `shrink-ai-relay.gs` — intentionally kept private and not tracked in this repository

## Licensing

The original Shrink source code, interface design, original content, and other original materials are proprietary and all rights are reserved by Ritam Saha. See `LICENSE.txt` for the governing terms.

Third-party libraries and codecs are not relicensed by Shrink. Their own licenses and notices continue to apply; see `THIRD_PARTY_NOTICES.txt`.

The hosted Shrink service may be used for its intended personal or business purpose, subject to applicable terms and law. Access to the hosted service does not grant rights to redistribute or republish the underlying proprietary source code.

## Third-party dependencies

Shrink uses third-party browser libraries and may dynamically load codec support. The current inventory includes PDF.js, JSZip, pdf-lib, and jSquash/@jsquash/jpeg (MozJPEG). See `THIRD_PARTY_NOTICES.txt` for the purpose, license, repository, and delivery details for each dependency.

Third-party dependencies should be reviewed whenever their versions or delivery mechanisms change. In particular, remotely loaded packages should be pinned to a known version for reproducible production deployments when practical.

## Deployment

The production site is deployed as Cloudflare Workers static assets using `wrangler.jsonc`.

The repository intentionally does not contain the private AI relay, API keys, secrets, or other credentials. Keep those outside source control and configure them through the appropriate private environment or service.

Cloudflare observability is enabled in the current deployment configuration.

## Search and indexing

The production URL is verified in Google Search Console. The public site exposes `robots.txt` and an XML sitemap, and the sitemap contains the current indexed landing-page and guide URLs.

When adding or removing indexable pages:

1. Update the relevant page metadata and internal links.
2. Update `public/sitemap.xml` where appropriate.
3. Confirm the deployed URL responds correctly before requesting re-indexing.

## Privacy and data handling

Normal file compression is designed to run locally in the browser. Optional AI-assisted workflows are separate and may send user-provided data to the selected external provider when enabled.

Any future addition of analytics, advertising, authentication, payments, uploads, storage, or other data collection should be reflected in the site's privacy and terms documentation before release.

## Security

Do not commit API keys, tokens, private relay code, credentials, or user data. See `SECURITY.md` for vulnerability-reporting guidance.

## Maintenance checklist

Before a production release:

- verify the deployed compressor can handle representative PDF and image inputs;
- test large files and low-memory devices;
- review browser support for newly introduced encoders and codecs;
- review and update `THIRD_PARTY_NOTICES.txt` after dependency changes;
- confirm the sitemap, canonical URLs, and robots rules are current; and
- verify that no secrets or private backend files have entered the repository.

## Copyright

Copyright © 2026 Ritam Saha. All rights reserved.
