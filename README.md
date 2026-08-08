# Paper Pixel — Project Folder

This folder is the working home for Anna's portfolio site build. Point a Claude Cowork project at this folder ("Use an existing folder") so every session has this context automatically.

## Suggested Cowork project Instructions

Paste something like this into the project's Instructions field:

> This project is Anna's portfolio site — a UX/UI/branding portfolio with three visitor personas (recruiter, client, ex-boyfriend). Before proposing anything that touches tone, scope, or architecture, check `/docs/decisions-log.md` — don't re-litigate settled decisions without flagging it explicitly. Persona voice is defined in `/docs/tone-guide.md`. Never invent facts about Anna beyond what's in `/docs/facts.md`. Case studies follow the template in `/docs/case-study-template.md`.

## Folder structure

- `docs/facts.md` — source of truth for the AI chat and case study writing (professional layer + personal layer)
- `docs/tone-guide.md` — voice per persona, with example lines
- `docs/site-map.md` — pages, components, persona-switching behavior
- `docs/case-study-template.md` — the 9-section structure every case study follows
- `docs/decisions-log.md` — running record of what's been decided and why
- `site/` — actual site code goes here once the beta build starts

## Status

Beta scope locked: recruiter + client personas, one video per case study, chat on the professional knowledge layer only, no CMS yet. Ex-boyfriend persona and full persona-cut video trailers are fast-follow items after beta ships. See the decisions log for the full picture.
