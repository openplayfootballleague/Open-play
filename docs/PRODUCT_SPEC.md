# Open Play — Product Specification
Version: 1.0
Date: 7 November 2026
Status: Build specification; implementation must be verified feature by feature.

This document records the agreed product rules for the Open Play football league platform. The product must retain the approved black/charcoal, white, muted-grey and restrained orange visual identity, with Oswald headings and Inter body text. Use the latest connected orange OP mark when its source asset is available; do not recreate or substitute an older logo. Interfaces must be responsive on phone, iPad and desktop.

## 1. Product surfaces and roles
- Public/viewer: Home, Match Centre, Teams, Join Open Play, More.
- Registered player: Player Hub, Match Centre, Teams, More.
- Captain: Player Hub, Match Centre, Teams, Club, More. A captain is also a player.
- Administrator: private administration dashboard; permissions must be enforced server-side.
- One account has one permanent player identity. Player registration and joining a club are separate actions.
- Basic account creation precedes player registration. After account creation, the account has viewer access until player registration is completed.
- After player registration, Home becomes Player Hub. A player can remain clubless.
- The active venue/league context can be changed from a persistent selector. Changing context must never change actual membership or permissions.

## 2. Authentication and onboarding
- Support account creation with email and password, sign in, sign out, password reset and email verification.
- After signup, show a welcome/verification state and then the viewer experience when the identity is verified.
- Join Open Play offers Join a Team or Register a Team. Account creation is required before either application proceeds.
- Player registration creates or links the account's single permanent player identity.
- Player can search approved teams in the selected league, view team details and request to join.
- Only one active transfer request per player at a time. Player may retract it. Captain may accept or decline it. On rejection the player remains unattached and may request another team.
- Registering a team creates an application and captain account/player association without creating duplicate player identities.
- Protect private pages and data at the backend. Frontend route hiding is not authorization.

## 3. Player Hub
- Hero: circular profile photo, player name, and Appearances | Goals | Assists.
- Include current-season team details, fixtures to end of season, squad, results, league table, My Team, My Profile and notifications.
- Player statistics include current season, per-season history and all-time career totals.
- Notifications can be general, venue/league-specific or team-specific.
- Player may edit profile and upload a profile picture.
- Player history must persist when moving teams and across seasons.

## 4. Captain experience
- Club area handles join requests: accept or decline, with current membership updated only after acceptance.
- Captain Match Day includes a Team Sheets tab. Team sheets are required per fixture.
- 6-a-side: exactly 6 starters and up to 3 substitutes.
- 7-a-side: exactly 7 starters and up to 4 substitutes.
- Squad numbers are optional.
- Team-sheet participation forms the basis of player appearances and scorecards.
- Goalscorers and assists are recorded against named players after match; do not force assists or scorer data when unknown.
- Captains can see their team's discipline indicator, but not private individual player disciplinary records.

## 5. Season and team data integrity
- A team must re-register for every season. Never roll teams forward automatically.
- Each season has independent team participation records and a frozen historical snapshot: name, badge, captain, squad, results, stats, discipline and final position.
- A returning team may be linked to a prior team identity only through an explicit administrator decision.
- Changes to a current season must never rewrite a completed season snapshot.
- Completed/archived seasons are read-only by default. Corrections require an audited, authorised process.
- Each player has one permanent identity; team memberships are season-specific.
- Season stats reset for a new season; career totals aggregate verified historical match records.
- Do not derive historical stats from current team details or current membership.
- Archived seasons remain accessible in public app and admin. Preserve historical records if a team does not return.

## 6. Administrator dashboard
Main navigation:
1. Overview
2. Competitions / Seasons
3. Teams
4. Players
5. Applications
6. Fixtures
7. Results
8. Discipline
9. Finance
10. Analytics
11. Communications
12. Enquiries
13. Operations
14. Settings and Activity Log

Overview includes competition summary, quick actions and prominent Needs Attention task centre. Use searchable registers, select a record, edit/save. Prefer inline editing for simple fields and side panels for records without leaving the register. Important changes require guided confirmation.

### Competitions and seasons
- Seasons has two primary actions: New Season and Add New League.
- New Season selects an existing league and copies only prior season configuration as editable defaults. Never copy teams, squads, fixtures, results, memberships or discipline.
- Configurable fields: venue/pitch, competition name, 6/7-a-side format, season name, day/matchday, start/end time, match duration, team capacity, gameweeks, team/gameweek price and rules.
- After creation, independent controls: Open Registrations and Announce New Season. Announcements require editable message, recipient preview and explicit send. Default audience is players from the immediately preceding season of that league.
- Team recruitment and player recruitment are independent.
- Add New League supports new/existing venue, league name, format, pitch/capacity, available days/hours, schedule, match duration, gameweeks, team capacity, price per team per gameweek, total season cost and rules. Creates League and Season 1, Upcoming with registrations closed by default.
- Season views grouped by venue/league with Past, Active and Upcoming. Do not show empty venues/leagues.

### Teams and approvals
- Team approvals separate from player join requests. Chronological newest first, searchable.
- Application shows team name/badge, captain, venue, league, season, submission date/status. Admin can approve, reject or request more information.
- Approval creates/activates team identity where appropriate and creates a new season participation record; links captain's existing player identity.
- Team Details has Current and Upcoming views. Only show teams in the exact selected season.
- Team record tabs: Overview, Squad, Statistics, History, Settings.
- Editable fields include season team name, badge, captain, squad and status. Badge upload optional; show immediately left of team name on public profile when present, no placeholder when absent.
- Status options include folded, removed from competition, banned and archived. Never delete historical team identity to remove a team from competition.

### Fixtures and results
- Fixtures are generated for Upcoming seasons only, after team applications are approved and capacity reviewed.
- Round-robin schedule must generalise beyond eight teams. For 8 teams / 14 gameweeks: 4 fixtures per gameweek, each team plays each opponent twice, once home/away; 56 fixtures total; no team plays twice in one gameweek; balanced home/away.
- Preview by gameweek and explicitly confirm before publishing.
- Cancel/rearrange individual fixtures with audit history. Cancelling a gameweek moves it to the end (+7 days) and shifts following dates; preview and confirm, preserve fixture records and notify affected users.
- Add Results selects Active league and latest gameweek without submitted scores. All fixtures in the gameweek appear with home/away score inputs. Save draft or publish. Goals/assists optional.
- Publishing updates fixture status, result, league table, team/player statistics and all relevant public/player/captain screens.
- Historical Results filter by venue, league, season, gameweek and team. Corrections preserve original/new values, administrator and timestamp, then recalculate affected derived stats.

### Discipline
- Player incident: player, team/league/season, fixture/gameweek/date, yellow/red/other, reason, referee notes, fine and suspension. Fine creates one liability linked to incident; notify player and captain; payment due before next matchday; payment does not erase incident.
- Team strikes apply to that team in that season. Reasons include late payment, late cancellation, behaviour, lateness and other. First warning; second final warning; third removal for rest of season after confirmation.
- Team strike count resets in new season; history remains. Players see indicator/count only, not reason. Never expose individual discipline records to squad.

### Players
- Central Player Database with Past, Active and Upcoming views.
- Player record tabs: Profile, Statistics, Membership, Discipline, History.
- Admin can edit profile, manage membership, assign optional squad number, unlink account, archive/restore player and delete only eligible duplicate/incorrect records with safeguards.
- Unlinking account is separate from removing team membership. Archive preserves history. One account = one permanent player identity.
- Appearances derive from fixture participation; goals/assists derive from match records. Manual corrections audited.
- All-time career totals include archived seasons.

### Finance
- Overview, Team Payments, Player Fines, Team Fines, Referee Payments, Expenses and History.
- Summary: income, expenditure, outstanding, net position.
- Filter by venue, league, season, team/player, type and status.
- Team fees derive from season pricing. Fines link to original incident; referee payments link to fixture. Expenses record venue, pitch, referee or other category. Auditable history.

### Analytics
- Filter all venues, individual venue, league, season and date range.
- Financial, competition, venue utilisation, growth and same-league season comparison reporting.
- No fabricated data. Charts use charcoal, white labels, grey axes and orange series.

### Communications and enquiries
- Announcements: Drafts/Published; title, message, audience (all Open Play, venue, league, season, team, captains), recipient preview, save draft, preview, publish.
- Avoid duplicate delivery. Record delivery state honestly.
- One chronological enquiries list, newest first; categories Player, Team/Captain, Referee, Sponsorship, General; statuses New, In Progress, Awaiting Response, Resolved.
- Enquiry detail includes conversation, linked records, reply, internal note, assignment, status and close. Convert enquiry into a record without duplicate entry.

### Operations, settings and audit
- Operations includes Venues, Referees and Sponsors.
- Venues: address, pitches, capacity, available days/times and associated leagues.
- Referees: contact, availability, assignments, completed assignments, payments and history.
- Sponsors: logo, contact, agreement, renewal, associated leagues and payment history.
- Settings: admin accounts/permissions, competition defaults, notifications/platform settings.
- Activity log: administrator, action, affected record, previous/new values and timestamp; filterable.

## 7. Open Play Wrapped
Five-slide season and end-of-year experience:
1. Your Season
2. This Season's Stats
3. Open Play — The Bigger Picture (identical league-wide statistics for everyone in that competition/period)
4. Your Team
5. Your Season Summary highlighting verified personal bests.
Use only accurately recorded data. Do not invent assists or Man of the Match.

## 8. Security, privacy and quality
- Least-privilege access, server-side role checks, secure session handling and audit logs.
- Never commit secrets or service-role keys. Validate all inputs on server.
- Protect personal data; restrict disciplinary data and admin-only information.
- Prefer additive, reversible migrations. Do not silently delete or rewrite production data.
- Every interactive control must have a truthful outcome. If a backend is not connected, clearly label the feature as unavailable rather than pretending to save.
- Test build, types, permissions, core workflows and responsive layouts before claiming completion.
