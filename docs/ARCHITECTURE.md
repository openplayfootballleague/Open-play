 # Open Play — Initial Architecture

## Foundation
- React 18 and TypeScript
- Vite build tooling
- Cloudflare Pages-compatible static build, output directory: dist
- Lucide icons
- Inter body typography and Oswald display typography

## Current implementation boundary
This branch contains the first frontend shell: responsive administration navigation, overview, operational attention centre, quick-action navigation and truthful empty states. It deliberately contains no fabricated league records and does not pretend that database-backed actions are working.

## Planned service integration
Inspect and reuse the selected authentication and database provider before implementation. No provider credentials are committed to this repository. The next technical milestone is to configure the data and authentication service, then implement typed data access, server-side permissions and migrations.

## Cloudflare preview
Build command: npm run build
Build output directory: dist
Framework preset: Vite
Root directory: repository root

A preview deployment is not a production release. Do not change existing Open Play Cloudflare Workers or Pages projects as part of this initial preview.