# Release review handoff 2026-09-27

## STOP: review only
Latest user instruction supersedes prior production authorization. Do NOT update main/root/production. Wait for user's iPhone/iPad Safari review and a new production instruction.

## Source saved
Review branch: codex/official-parent-rebuild-20260910
Published site-source GitHub commit: d09252409d64e7de76633e90b0667f27ae9348dd
Source tree: 9c74030e834d944e2a2374bc5d79d2f13f7f618b
Equivalent local commit: 8b218d859cef9e16727803d1b0a98d7eb3b50fed
Only index.html/site.css changed. Unrelated modified root teacher_intro_clean_403456db.mp4 preserved, excluded.
Main remains b1b7fd5dfbf7a6c87ae6b2a0f9c0d6f717384693. No production deployment performed.

## Review publication
Old site successfully published Version 13 ver_501c8eccdc524c44a9a6cf984c2396f8, then expired at 2026-09-27T05:30:59.680Z; confirmed isExpired=true / suspended.
Same exact 14-file payload (4,154,656 bytes), no rebuild or asset processing, moved to new free public review site:
URL: https://lucid-sky-5365.hosted.pageshare.ai/
Site ID: site_3447d8cc66b046aba87fb6b6aba86437
Version 1: ver_d3852b143bab4ee98be85357fc4693f2
isPublished=true, isExpired=false, hostedSubdomainStatus=active
Expires 2026-10-04T05:31:17.727Z (14:31 JST).
Version numbering restarts on the new site; contents equal old V13.

## Completed this turn
npm run build PASS; structural verify PASS; 8 static audits PASS; navigation tests and 6 pricing cases PASS.
Four brand routes, blog destinations, anchors/ARIA, labels, disclosures/table semantics, review redirects/noindex checks PASS.
7 verified-source voices retained (4 parents / 3 students); no new claims or media changes.
Browser screenshots:
- 320/root32 contact: heading reads 一緒に考え / ませんか。; pageOverflow0 and local[] visible in harness.
- 820/root16 FAQ: navy/white/gold icon and answers legible, pageOverflow0/local[].
- 390/root16 voices: heading and first quotation card legible, pageOverflow0/local[].
- New URL direct home loads image/CSS.
- 1366/root16 pricing: 3 columns, icons, figures and condition text legible, pageOverflow0/local[].
- 1024/root16 counseling: 2x2 topics and asymmetrical price/CTA panel, pageOverflow0/local[].
- 768/root16 journal: featured navy article/cool background, pageOverflow0/local[].
- 320/root16 FAQ: question/answer reflow without visible clipping, pageOverflow0/local[].
These are targeted viewport screenshots, not a fresh comprehensive all-section visual QA nor actual Safari.
DOM result retrieval initially timed out; screenshot recovered. Did not repeat that failed operation. Old-URL PC navigation subsequently blocked as site expired; verified expiry via PageShare, new URL loaded successfully.

## Remaining / review notes
User iPhone and iPad Safari portrait/landscape review, actual text zoom200%, all changed chapters/controls.
External destination availability and actual form opening/submission not rechecked this turn; source links/static integrity passed. Do not claim live form delivery verified.
Minor visual consistency: fourth consultation topic lacks icon while other three have one. No interaction/layout failure; retain as review feedback item.
Full CTA button/body at 200% not all captured this turn; heading specifically passed.
No 100-point or production-ready final claim.

## Production safety for later
Review meta robots noindex,follow must not reach production.
Exclude __review.html and redirect stubs bansou/index.html, eiken/index.html, gyakuten/index.html, retry/index.html, hikaku/index.html from production parent-file replacement.
Preserve all existing brand/blog directories. Do not merge the entire review repository/dist over main or replace whole root.
Before a later authorized production deployment, compare main pre-state and deploy only agreed parent assets with production SEO settings.

## Exact next point
Do not rebuild/reupload/recreate for unchanged source. Give the user the new review URL and wait for Safari feedback; no main mutation.
