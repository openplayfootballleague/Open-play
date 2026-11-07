# Open Play — Development Plan

## Project direction
Build the Open Play football league management platform from the approved Master Platform Development Prompt (v3.0, 7 November 2026).

The repository is the source of truth for application code and technical documentation.

## Non-negotiable product principles
- Preserve the approved consumer-facing homepage and visual direction.
- Use the latest connected orange Open Play OP logo; do not revert to older logo artwork.
- Prioritise a genuinely usable, consistent administrator dashboard.
- Keep account creation, player registration, team membership, captain permissions and administrator permissions distinct.
- Enforce permissions on the server/database, not only in the interface.
- Preserve existing records and historical data; never silently overwrite archived season snapshots.
- Do not invent teams, players, results, statistics, payments or message-delivery confirmations.
- Every visible control must perform a real, validated action.
- Build responsive experiences for phones, iPad and desktop.

## Required product areas
1. Public website and Match Centre
2. Authentication and onboarding
3. Viewer and player experiences / Player Hub
4. Captain Hub, club management, availability and team sheets
5. Admin Dashboard: Overview, Competitions, Teams, Players, Applications, Fixtures, Results, Statistics, Finance, Communications, Settings
6. Open Play Wrapped
7. Privacy, permissions, audit history and data integrity

## Critical domain rules
- Support 6-a-side (6 starters, up to 3 substitutes) and 7-a-side (7 starters, up to 4 substitutes).
- Each season has independent team participation records and historical snapshots.
- Teams must re-register each season; returning identity must never be assumed automatically.
- A player has one permanent player identity; memberships are season-specific.
- A player may have only one active pending team request at a time.
- Squad numbers are optional.
- Archived seasons and their team profiles are read-only by default.
- Player statistics must come from verified underlying match records.

## Implementation approach
1. Inspect the repository and establish the current application stack and structure.
2. Record the technical architecture, existing integrations and deployment arrangement.
3. Map the current database and authentication model before proposing migrations.
4. Implement in small, reviewable stages on feature branches.
5. Run available lint, type-check, build and workflow tests after changes.
6. Report exactly what changed, what was tested, and anything still requiring configuration or manual action.
7. Merge to main and deploy only through an agreed, verified release process.

## Safety and change control
- Do not replace or delete existing production data.
- Do not commit secrets, API keys, service-role credentials or personal data.
- Do not change production deployment settings without explicit agreement.
- Prefer additive, reversible database migrations.
- Never claim a workflow is complete unless its real end-to-end behaviour has been verified.

## Stack decision
Not yet confirmed. Inspect the repository and existing hosting/database services before selecting or introducing a framework, database, authentication provider or deployment workflow. Prefer reuse of an existing working service over unnecessary replacement.
