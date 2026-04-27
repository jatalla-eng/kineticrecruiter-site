# Cloud Build GitHub Trigger Setup

**Project:** `kineticrecruiterpublic` (project number `741700859778`)
**Region:** `australia-southeast1`
**GitHub repo:** `jatalla-eng/kineticrecruiter-site` → branch `main`
**Build config:** `cloudbuild.yaml` (includes a project guard at Step 0 — see that file)

> KR is fully isolated from any AgentOS project. If you ever see KR resources or a
> trigger pointing at an `agentos-*` project, that is a misconfiguration — fix the
> caller's gcloud project context and re-run, do not paper over it.

## What the trigger does

Pushes to `main` build a Docker image, push to Artifact Registry, deploy to Cloud Run,
purge the Cloud CDN URL map cache, and ping IndexNow with the sitemap.

## Verifying the trigger exists

```bash
gcloud builds triggers list \
  --project=kineticrecruiterpublic \
  --format="table(name,github.owner,github.name,filename,disabled)"
```

You should see one trigger named `deploy-on-push-to-main` listening on
`jatalla-eng/kineticrecruiter-site` with filename `cloudbuild.yaml`.

## Re-creating the trigger (only if it has been deleted)

The trigger needs the Cloud Build GitHub App connected to your GitHub account. The
app authorization is per-account and outlives any individual trigger.

### One-time GitHub App connection (already done)

If the GitHub App has not been connected to `kineticrecruiterpublic` yet, do this
once via the Console:

1. Open https://console.cloud.google.com/cloud-build/triggers?project=kineticrecruiterpublic
2. Click **Connect Repository** → **GitHub (Cloud Build GitHub App)**
3. Authorize the `jatalla-eng/kineticrecruiter-site` repository
4. Skip the trigger creation wizard at the end — we create it via CLI below

### Trigger creation (CLI)

Once the GitHub connection is in place:

```bash
gcloud builds triggers create github \
  --project=kineticrecruiterpublic \
  --region=global \
  --name=deploy-on-push-to-main \
  --repo-owner=jatalla-eng \
  --repo-name=kineticrecruiter-site \
  --branch-pattern='^main$' \
  --build-config=cloudbuild.yaml
```

## Manual deploy (when you need to bypass the trigger)

```bash
gcloud builds submit \
  --project=kineticrecruiterpublic \
  --config=cloudbuild.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse --short HEAD) \
  .
```

`cloudbuild.yaml` Step 0 will reject the build if `--project` is anything other
than `kineticrecruiterpublic`, so an accidental misdirect aborts before any side
effects.

## Production URLs

- **Site:** https://kineticrecruiter.com (fronted by global HTTPS load balancer in `kineticrecruiterpublic`)
- **Cloud Run direct:** https://kineticrecruiter-site-741700859778.australia-southeast1.run.app
