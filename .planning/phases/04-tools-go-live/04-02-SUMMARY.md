---
phase: 04-tools-go-live
plan: 02
subsystem: infra
tags: [docker, cloud-run, cloud-build, gcp, nextjs, ci-cd]

# Dependency graph
requires:
  - phase: 04-01
    provides: Next.js standalone build with JD Generator, ROI Calculator, and all pages
provides:
  - Multi-stage Dockerfile for Cloud Run (node:20-alpine, port 8080, standalone output)
  - .dockerignore excluding node_modules, .git, .env*, .next/cache
  - cloudbuild.yaml CI/CD pipeline deploying to australia-southeast1 on push to main
  - DEPLOYMENT.md full runbook for first deploy, GEMINI_API_KEY setup, domain mapping, rollback
affects: [deployment, ci-cd, domain-mapping, kineticrecruiter.com]

# Tech tracking
tech-stack:
  added: [docker, google-cloud-build, google-cloud-run, gcr]
  patterns: [multi-stage-docker-build, standalone-nextjs-deployment, env-var-via-cloud-run-config]

key-files:
  created:
    - Dockerfile
    - .dockerignore
    - cloudbuild.yaml
    - DEPLOYMENT.md
  modified: []

key-decisions:
  - "Dockerfile uses 3-stage build (deps/builder/runner) with node:20-alpine throughout for consistent, minimal images"
  - "content/ and public/ directories explicitly copied into runner stage — blog.ts reads markdown from fs at runtime"
  - ".next/static explicitly copied to .next/standalone/.next/static — standalone does not include static assets automatically"
  - "GEMINI_API_KEY intentionally absent from cloudbuild.yaml — set once via gcloud run services update, retained between deployments"
  - "Cloud Run configured with 0 min instances (cost-efficient for marketing site) and 3 max instances"

patterns-established:
  - "Env var security: secrets set via gcloud run services update --set-env-vars, never in tracked files"
  - "CI/CD: Cloud Build triggers on push to main, builds image tagged with $COMMIT_SHA for traceability"

requirements-completed: [INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07]

# Metrics
duration: 1min
completed: 2026-04-07
---

# Phase 4 Plan 2: Docker and Cloud Build CI/CD Summary

**3-stage Dockerfile with standalone Next.js on port 8080, Cloud Build CI/CD to australia-southeast1, and full DEPLOYMENT.md runbook covering IAM, domain mapping, and GEMINI_API_KEY setup**

## Performance

- **Duration:** 1 min
- **Started:** 2026-04-07T23:28:57Z
- **Completed:** 2026-04-07T23:30:00Z
- **Tasks:** 2 (+ 1 checkpoint auto-approved)
- **Files modified:** 4

## Accomplishments

- Dockerfile: 3-stage multi-stage build (deps/builder/runner) using node:20-alpine, outputs standalone Next.js server on port 8080 with content/ and public/ directories included
- cloudbuild.yaml: full CI/CD pipeline — builds Docker image, pushes to GCR with both commit SHA and latest tags, deploys to Cloud Run in australia-southeast1 with 512Mi/1CPU/0-3 instances
- DEPLOYMENT.md: complete runbook covering initial GCP setup, IAM permissions, first deploy, GEMINI_API_KEY configuration via Cloud Run env vars, Cloud Build trigger setup, domain mapping for kineticrecruiter.com and www.kineticrecruiter.com, TLS verification, rollback, and local Docker testing

## Task Commits

1. **Task 1: Dockerfile and .dockerignore** - `e9faf86` (feat)
2. **Task 2: cloudbuild.yaml and DEPLOYMENT.md** - `9da0756` (feat)

## Files Created/Modified

- `Dockerfile` - 3-stage multi-stage build; deps installs dependencies, builder runs next build, runner is minimal alpine image with standalone output on port 8080
- `.dockerignore` - Excludes node_modules, .git, .env*, .next/cache, IDE files; preserves content/ public/ src/ package.json
- `cloudbuild.yaml` - Cloud Build steps: docker build (with $COMMIT_SHA + latest tags), push to GCR, gcloud run deploy to australia-southeast1 with resource limits; GEMINI_API_KEY absent by design
- `DEPLOYMENT.md` - Full runbook: prerequisites, IAM setup, first deploy, GEMINI_API_KEY via gcloud, Cloud Build trigger, domain mapping for both kineticrecruiter.com and www, DNS records, TLS verification, rollback commands, local Docker testing

## Decisions Made

- GEMINI_API_KEY is not in cloudbuild.yaml — set once via `gcloud run services update --set-env-vars`; Cloud Run retains env vars between deployments so this is safe and secure
- content/ directory explicitly copied into runner stage — `blog.ts` reads markdown files from the filesystem at runtime via Node.js `fs` module; missing this would break the blog at runtime
- `.next/static` explicitly copied to `.next/standalone/.next/static` — Next.js standalone mode does not bundle static assets, they must be manually copied or CSS/JS breaks

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

Manual steps documented in DEPLOYMENT.md:

1. Enable GCP APIs: `gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com`
2. Grant Cloud Build service account `roles/run.admin` and `roles/iam.serviceAccountUser`
3. First deploy: build + push image, then `gcloud run deploy`
4. Set GEMINI_API_KEY: `gcloud run services update kineticrecruiter-site --region australia-southeast1 --set-env-vars GEMINI_API_KEY=YOUR_KEY`
5. Connect Cloud Build to GitHub repo via GCP Console (push to main trigger)
6. Domain mapping: run two `gcloud run domain-mappings create` commands, add DNS records at registrar, wait for TLS

## Known Stubs

None — this plan creates infrastructure configuration files, not UI components. No runtime stubs.

## Next Phase Readiness

Phase 4 and the entire v1.0 milestone are complete. The site is fully production-deployable:

- Push to main triggers Cloud Build which builds, pushes, and deploys automatically
- GEMINI_API_KEY is set via Cloud Run (not in git) — JD Generator will work in production
- kineticrecruiter.com and www.kineticrecruiter.com map to the Cloud Run service via domain-mappings
- All pages SSR with full HTML for Google and AI search crawlability

Remaining manual steps are documented in DEPLOYMENT.md and require human action (GCP IAM setup, domain mapping, API key).

---
*Phase: 04-tools-go-live*
*Completed: 2026-04-07*
