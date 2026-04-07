# Deployment Guide — KineticRecruiter Marketing Site

Cloud Run deployment in australia-southeast1. Automated via Cloud Build on push to main.

## Prerequisites

- gcloud CLI installed and authenticated: `gcloud auth login`
- Docker installed (for local testing)
- GCP project created with billing enabled
- Cloud Run API and Cloud Build API enabled

Enable APIs if needed:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

## Initial Setup (One-Time)

### 1. Set GCP project

```bash
gcloud config set project YOUR_PROJECT_ID
```

Replace `YOUR_PROJECT_ID` with your actual GCP project ID.

### 2. Grant Cloud Build permissions for Cloud Run

```bash
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)')
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 3. First deployment (manual — to create the Cloud Run service)

```bash
gcloud run deploy kineticrecruiter-site \
  --image gcr.io/YOUR_PROJECT_ID/kineticrecruiter-site:latest \
  --region australia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 3
```

Note: You must build and push the image first (or let Cloud Build do it on the first push to main).

### 4. Set GEMINI_API_KEY (required for JD Generator)

Get your Gemini API key: https://aistudio.google.com/apikey

```bash
gcloud run services update kineticrecruiter-site \
  --region australia-southeast1 \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_KEY
```

Verify it's set:

```bash
gcloud run services describe kineticrecruiter-site \
  --region australia-southeast1 \
  --format='value(spec.template.spec.containers[0].env)'
```

**Security:** Never put GEMINI_API_KEY in cloudbuild.yaml, Dockerfile, or any git-tracked file. Cloud Run retains env vars between deployments — set once, update only when rotating.

### 5. Connect Cloud Build to GitHub repo

In GCP Console > Cloud Build > Triggers:

1. Click "Connect repository"
2. Select GitHub, authorize, choose `yajean/kineticrecruiter-site`
3. Create trigger:
   - Name: `deploy-on-push-to-main`
   - Event: Push to branch
   - Branch: `^main$`
   - Configuration: Cloud Build configuration file
   - File location: `/cloudbuild.yaml`

After this, every `git push origin main` triggers a build and deploy.

## Custom Domain Mapping (kineticrecruiter.com)

After the Cloud Run service is running, map the custom domain.

### 1. Map kineticrecruiter.com

```bash
gcloud run domain-mappings create \
  --service kineticrecruiter-site \
  --domain kineticrecruiter.com \
  --region australia-southeast1
```

### 2. Map www.kineticrecruiter.com

```bash
gcloud run domain-mappings create \
  --service kineticrecruiter-site \
  --domain www.kineticrecruiter.com \
  --region australia-southeast1
```

### 3. Get DNS records

```bash
gcloud run domain-mappings describe --domain kineticrecruiter.com --region australia-southeast1
```

This outputs DNS records (A/AAAA for root, CNAME for www). Add these at your domain registrar.

### 4. Verify TLS

Cloud Run provisions a TLS certificate automatically once DNS propagates (usually 15-60 minutes). Verify:

```bash
curl -I https://kineticrecruiter.com
# Should return HTTP/2 200
```

## Ongoing Deployments

Every push to `main` triggers Cloud Build automatically. No manual steps.

To view build status:

```bash
gcloud builds list --limit 5
```

To view Cloud Run logs:

```bash
gcloud run services logs read kineticrecruiter-site --region australia-southeast1 --limit 50
```

## Rollback

To roll back to a previous revision:

```bash
gcloud run revisions list --service kineticrecruiter-site --region australia-southeast1
gcloud run services update-traffic kineticrecruiter-site \
  --to-revisions REVISION_NAME=100 \
  --region australia-southeast1
```

## Local Docker Testing

```bash
# Build
docker build -t kineticrecruiter-local .

# Run (with a local key for testing only — never commit)
docker run -p 8080:8080 -e GEMINI_API_KEY=YOUR_KEY kineticrecruiter-local

# Test
curl http://localhost:8080/
```
