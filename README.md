# Shrink

A browser-based file compressor for PDFs and images.

## Licensing

The original Shrink source code and original application materials are proprietary and all rights are reserved by Ritam Saha. See `LICENSE.txt`.

This does **not** relicense third-party libraries used by the app. See `THIRD_PARTY_NOTICES.txt`.

## Repository structure

- `public/index.html` — licensed Shrink front-end
- `public/robots.txt` — crawler rules for the deployed site
- `LICENSE.txt` — proprietary license for original Shrink materials
- `THIRD_PARTY_NOTICES.txt` — third-party dependency notices
- `wrangler.jsonc` — Cloudflare Workers static-assets configuration
- `shrink-ai-relay.gs` is intentionally not tracked in this public repository; keep the Apps Script backend private.

## Important before publishing

1. Replace the `REPLACE_WITH_YOUR_DOMAIN` placeholders in `public/index.html` with the real production domain before launch.
2. Verify the deployed Apps Script relay URL and any secrets before making the service public.
3. Do not commit API keys, Apps Script secrets, or other credentials.
4. If you later add analytics, advertising, authentication, payments, or other data collection, update the privacy/terms documentation to match the actual behavior.
5. Keep the third-party notices when redistributing the project.

## Copyright notice

Copyright © 2026 Ritam Saha. All rights reserved.
