# Setting Up Automatic GitHub Deployments

## Issue Identified
Your homepage changes weren't deployed automatically because the Cloud Build GitHub trigger wasn't set up.

## Manual Deployment (Completed)
✅ Your latest changes have been manually deployed and are now live!

## Setting Up Automatic Deployments

To make future `git push` commands automatically deploy, set up a Cloud Build trigger:

### Option 1: Cloud Console (Recommended)
1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click **"Create Trigger"**
3. Choose **"Connect Repository"** → **"GitHub"**
4. Select: `jatalla-eng/kineticrecruiter-site`
5. Configure trigger:
   - **Name**: `deploy-on-push-to-main`
   - **Event**: Push to branch
   - **Branch**: `^main$`
   - **Configuration**: Cloud Build configuration file
   - **File location**: `/cloudbuild.yaml`
6. Click **"Create"**

### Option 2: Command Line
```bash
# This might require additional GitHub App permissions
gcloud builds triggers create github \
  --name="deploy-on-push-to-main" \
  --repo-name="kineticrecruiter-site" \
  --repo-owner="jatalla-eng" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml"
```

### Test Automatic Deployment
After setting up the trigger, test with a small change:
```bash
echo "# Test automatic deployment" >> README.md
git add README.md
git commit -m "test: verify automatic deployment trigger"
git push origin main
```

Then check: `gcloud builds list --limit=1`

## Manual Deployment (If Needed)
If you ever need to manually deploy:
```bash
COMMIT_SHA=$(git rev-parse --short HEAD)
gcloud builds submit --config cloudbuild.yaml --substitutions=COMMIT_SHA=$COMMIT_SHA .
```

## Production Site
Your updated homepage is now live at:
https://kineticrecruiter-site-746481210678.australia-southeast1.run.app