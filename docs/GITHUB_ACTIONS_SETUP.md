# GitHub Actions Setup Guide

## Overview

This guide explains how to configure GitHub Actions for automated deployment to **Vercel** (frontend) and **Railway** (backend).

## Workflow File Location

```
.github/workflows/deploy.yml
```

## Required Secrets Configuration

You need to add the following secrets to your GitHub repository:

### Vercel Secrets

1. **VERCEL_TOKEN**
   - What: Authentication token for Vercel CLI
   - Where to get: https://vercel.com/account/tokens
   - Instructions:
     1. Go to https://vercel.com/account/tokens
     2. Click "Create Token"
     3. Name it: `GitHub Actions`
     4. Copy the token

2. **VERCEL_ORG_ID**
   - What: Your Vercel organization ID
   - Where to get: https://vercel.com/account/settings
   - Instructions:
     1. Go to https://vercel.com/account
     2. Copy your "Team ID" from Settings
     3. This is your `VERCEL_ORG_ID`

3. **VERCEL_PROJECT_ID**
   - What: Project ID for this specific project
   - Where to get: Project Settings in Vercel Dashboard
   - Instructions:
     1. Go to https://vercel.com/projects
     2. Select "manuel-manero---ecossistema-uau"
     3. Go to Settings → General
     4. Copy the "Project ID"

### Railway Secrets

4. **RAILWAY_TOKEN**
   - What: Authentication token for Railway API
   - Where to get: https://railway.app/account/tokens
   - Instructions:
     1. Go to https://railway.app/account/tokens
     2. Click "Create New Token"
     3. Copy the token

## How to Add Secrets to GitHub

### Method 1: GitHub Web UI (Easy)

1. Go to: `https://github.com/DaSilvaAlves/Manero/settings/secrets/actions`
2. Click "New repository secret"
3. Add each secret one by one:
   - Name: `VERCEL_TOKEN`
   - Value: (paste token from Vercel)
4. Click "Add secret"
5. Repeat for all 4 secrets

### Method 2: GitHub CLI (Faster)

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com

# Authenticate
gh auth login

# Add secrets
gh secret set VERCEL_TOKEN --body "your-token-here" -R DaSilvaAlves/Manero
gh secret set VERCEL_ORG_ID --body "your-org-id" -R DaSilvaAlves/Manero
gh secret set VERCEL_PROJECT_ID --body "your-project-id" -R DaSilvaAlves/Manero
gh secret set RAILWAY_TOKEN --body "your-token-here" -R DaSilvaAlves/Manero
```

## Workflow Trigger Events

The workflow runs automatically on:

```yaml
on:
  push:
    branches:
      - master
      - main
  pull_request:
    branches:
      - master
      - main
```

This means:
- **Every push to `master` or `main`**: Triggers full deployment
- **Every PR to `master` or `main`**: Runs build & tests (no deployment)

## Workflow Jobs Breakdown

### 1. **Build Job** (Always runs)
- Installs dependencies
- Runs linting (continues on error)
- Runs type checking (continues on error)
- Builds the Vite project
- Uploads artifact for deployment

### 2. **Deploy-Vercel Job** (Only on push to master/main)
- Downloads build artifact
- Deploys to Vercel
- Sets production flag
- Output: `https://manuel-manero---ecossistema-uau.vercel.app`

### 3. **Deploy-Railway Job** (Only on push to master/main)
- Authenticates with Railway token
- Deploys backend service
- Output: Railway dashboard

### 4. **Smoke-Tests Job** (Only after Vercel deployment)
- Waits 30 seconds for deployment to be live
- Tests endpoint availability
- Confirms successful deployment

### 5. **Deployment-Status Job** (Final summary)
- Shows success/failure status
- Lists deployment URLs
- Notifies of any issues

## Environment Variables in Workflow

The following environment variables are used:

```yaml
VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## Verification Steps

After configuring secrets, verify the setup:

### 1. Check Secrets in GitHub

```bash
# List all secrets (titles only, values hidden)
gh secret list -R DaSilvaAlves/Manero
```

### 2. Verify Workflow File

Go to: `https://github.com/DaSilvaAlves/Manero/actions`
- You should see "Deploy to Vercel + Railway" workflow
- No errors or warnings should appear

### 3. Trigger a Test Deployment

```bash
# Make a small change and push to master
echo "# Test deployment" >> README.md
git add README.md
git commit -m "test: trigger github actions workflow"
git push origin master
```

Then go to: `https://github.com/DaSilvaAlves/Manero/actions`
- Watch the workflow run
- Check each job status

## Troubleshooting

### Workflow doesn't run after push

- ✅ Check that push is to `master` or `main` branch
- ✅ Verify workflow file syntax: `.github/workflows/deploy.yml`
- ✅ Check that secrets are configured
- ✅ Go to Actions tab and look for error messages

### Vercel deployment fails

- ❌ Check `VERCEL_TOKEN` is valid (not expired)
- ❌ Verify `VERCEL_ORG_ID` matches your Vercel account
- ❌ Verify `VERCEL_PROJECT_ID` matches the actual project in Vercel
- ❌ Check Vercel project settings allow deployments from GitHub

### Railway deployment fails

- ❌ Check `RAILWAY_TOKEN` is valid (not expired)
- ❌ Verify Railway service is configured with the name "api"
- ❌ Check Railway project is set to production environment

### Build fails in workflow

- ✅ Check `npm run build` works locally
- ✅ Verify all dependencies are in `package.json`
- ✅ Check environment variables needed for build
- ✅ Review build logs in GitHub Actions UI

## Monitoring Deployments

### GitHub Actions Dashboard

1. Go to: `https://github.com/DaSilvaAlves/Manero/actions`
2. Click on workflow runs to see:
   - Build logs
   - Deployment output
   - Status of each job
   - Any errors or failures

### Vercel Dashboard

1. Go to: `https://vercel.com/projects`
2. Click "manuel-manero---ecossistema-uau"
3. View:
   - Recent deployments
   - Build logs
   - Domain status
   - Analytics

### Railway Dashboard

1. Go to: `https://railway.app/projects`
2. Click your project
3. View:
   - Deployment history
   - Service logs
   - Environment variables
   - Resource usage

## Next Steps

1. ✅ Add all 4 secrets to GitHub
2. ✅ Verify workflow file is in `.github/workflows/deploy.yml`
3. ✅ Make a test push to trigger workflow
4. ✅ Monitor the deployment in GitHub Actions & Vercel
5. ✅ Verify frontend is live at Vercel URL
6. ✅ Check Railway backend is deployed

## Rollback Procedures

If deployment fails:

### Rollback Vercel

```bash
# Revert to previous deployment
# Go to Vercel dashboard → deployments → select previous version → "Promote to production"
```

### Rollback Railway

```bash
# Revert to previous deployment
# Go to Railway dashboard → Service → Deployments → select previous → "Redeploy"
```

### Manual Local Deployment (Emergency)

```bash
# If GitHub Actions fails, deploy manually
cd apps/web

# Vercel
vercel --prod

# Railway (from backend folder)
cd ../api
railway deploy --service api --environment production
```

## Security Best Practices

- 🔒 Never commit secrets to GitHub
- 🔒 Rotate tokens every 90 days
- 🔒 Use minimal scopes for tokens (only what's needed)
- 🔒 Delete tokens from old devices/CI systems
- 🔒 Review who has access to GitHub secrets
- 🔒 Enable 2FA on Vercel & Railway accounts

## Documentation References

- GitHub Actions: https://docs.github.com/en/actions
- Vercel CLI: https://vercel.com/docs/cli
- Railway Docs: https://docs.railway.app
- Deploy action: https://github.com/vercel/action

---

**Last Updated:** 2026-02-17
**Workflow Status:** ✅ Ready for production
