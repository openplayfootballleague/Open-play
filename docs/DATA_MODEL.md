# Open Play — Logical Data Model

This is a provider-neutral logical model. It is not yet a production migration. Confirm the existing Cloudflare/database services and authentication setup before selecting physical storage or running migrations.

## Identity and access
- **UserAccount**: authentication-provider subject, email, verification state, timestamps.
- **Player**: permanent player identity; optional linked UserAccount; profile fields and photo reference.
- **AdminMembership**: user, role, permission grants, active state.
- **CaptainRole**: player, season team participation, role state.
- A user account must not create multiple player identities. Enforce uniqueness at the database/service boundary.

## Competition structure
- **Venue**: address, facilities, pitch inventory, capacity, availability.
- **League**: venue, name, format, defaults, operational state.
- **Season**: league, name, start/end, matchday schedule, match duration, capacity, pricing, rules, status, registration flags.
- **SeasonTeam**: season-specific team entry, historical team identity link (nullable and explicit), name/badge/captain snapshot, status, approval state.
- **SeasonMembership**: player, season, season team, membership status, dates, optional squad number.
- **TeamApplication**: season, applicant/captain, proposed team details, status, submitted/reviewed timestamps and review history.
- **TeamJoinRequest**: player, season team, status and timestamps. Enforce at most one active pending request per player.

## Match records and derived statistics
- **Fixture**: season, gameweek, home/away season-team references, scheduled time, venue/pitch, status.
- **TeamSheet**: fixture, season team, submitted by, submitted timestamp and state.
- **TeamSheetPlayer**: team sheet, player/membership, starter/substitute role, participation state.
- **MatchResult**: fixture, home/away score, draft/published state, publisher and timestamps.
- **MatchEvent**: fixture, player, event type (goal, assist, card, other), related player where appropriate, event time and source.
- Appearances are derived from verified participation. Goals and assists derive from match events. Do not store unverified aggregates as the source of truth.
- **ResultCorrection**: original values, corrected values, reason, administrator and timestamp.

## Discipline and finance
- **DisciplinaryIncident**: player or season team, fixture, incident type, reason, notes, fine, suspension and author.
- **TeamStrike**: season team, strike number, reason, notes, author and timestamp.
- **FinancialTransaction**: income/expense/liability, category, amount, due date, paid state, linked team/player/incident/fixture and audit metadata.
- Fine payment is a transaction linked to its incident; it must not duplicate or delete the incident.

## Communications and operations
- **Announcement**: content, audience definition, author, draft/published state, scheduled/published timestamps.
- **AnnouncementRecipient/Delivery**: resolved recipient, channel, delivery state, provider reference and timestamps; prevent duplicate sends.
- **Enquiry** and **EnquiryMessage**: category, sender, status, assignment, linked records and conversation history.
- **Referee**, **RefereeAvailability**, **FixtureRefereeAssignment**.
- **Sponsor**, **SponsorshipAgreement**.
- **AuditEvent**: actor, action, entity, entity id, before/after values, timestamp and request correlation id.

## Season snapshot and immutability rules
1. Every team-season entry is a separate record. A prior season team must never be copied into a new season automatically.
2. On season completion, freeze a season snapshot containing the visible team name, badge, captain, squad, results, discipline and final position.
3. Historical team and player membership links must reference the season records that actually participated in each match.
4. New-season team re-registration may optionally link to an older team identity only after an explicit administrator choice.
5. Archived seasons are read-only by default. A correction must be an explicit audited operation; no silent historical rewrite.
6. Current season changes cannot mutate completed season snapshots.
7. All-time stats aggregate verified match-level records across seasons, not current profile values.
8. Keep account unlinking separate from player identity archival and season membership removal.

## Access boundaries
- Public: published league, team, fixture, result and permitted aggregate statistic data.
- Authenticated viewer: own account and permitted public data.
- Player: own profile, own membership, own requests, own statistics and relevant team/league content.
- Captain: player permissions plus management of their own season team and its requests/team sheets.
- Administrator: explicitly granted administrative permissions, with sensitive discipline, finance and audit access restricted to appropriate roles.
- Enforce all boundaries in server-side policies/services. UI visibility is supplementary only.

## Data migration and validation checklist
- Use foreign keys and explicit status enums.
- Add uniqueness constraints for account-to-player identity and fixture team pairings.
- Prevent a team from playing twice in one gameweek.
- Validate team-sheet starter/substitute limits against the season format.
- Validate player membership in the relevant season team before allowing team-sheet or match-event assignment.
- Use transactions for result publishing, standings/stat recalculation and related audit records.
- Store money in integer minor units (e.g. pence), not floating point.
- Store timestamps in UTC and render them in venue-local time.
- Keep raw source events and audit history; derived standings/statistics can be recomputed.
