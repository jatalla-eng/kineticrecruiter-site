#!/bin/bash

# Production Environment Setup Script
# Run this after your first deployment to configure environment variables

echo "Setting up production environment variables for Cloud Run..."

# Check if gcloud is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "Please authenticate with gcloud first:"
    echo "gcloud auth login"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "Please set your GCP project ID:"
    echo "gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "Using project: $PROJECT_ID"
echo "Setting environment variables for Cloud Run service: kineticrecruiter-site"

# Generate a secure session secret
SESSION_SECRET=$(openssl rand -base64 32)

echo "Setting environment variables..."

# Set admin authentication environment variables
gcloud run services update kineticrecruiter-site \
  --region australia-southeast1 \
  --set-env-vars \
ADMIN_USERNAME=admin,\
ADMIN_PASSWORD=KineticRecruiter2026!,\
SESSION_SECRET="$SESSION_SECRET",\
NODE_ENV=production

echo "✅ Environment variables set successfully!"

# Verify the variables are set (without showing sensitive values)
echo ""
echo "Verifying environment variables..."
gcloud run services describe kineticrecruiter-site \
  --region australia-southeast1 \
  --format='value(spec.template.spec.containers[0].env[].name)' | sort

echo ""
echo "🚀 Production environment ready!"
echo ""
echo "Admin credentials for production:"
echo "  URL: https://[your-domain]/admin/login"
echo "  Username: admin"
echo "  Password: KineticRecruiter2026!"
echo ""
echo "⚠️  Important: Change the admin password in production!"
echo "Update ADMIN_PASSWORD environment variable with a secure password."