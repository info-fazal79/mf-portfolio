#!/bin/bash
# Muhammad Fazal Portfolio - One-Click Deployment Packager for cPanel
# This script builds the static Next.js site and copies both frontend assets and backend PHP to the deploy_me folder.

echo "============================================="
echo "Starting cPanel Build & Packaging Process..."
echo "============================================="

# 1. Clean previous build artifacts
echo " Cleaning older builds..."
rm -rf out
rm -rf deploy_me
mkdir -p deploy_me

# 2. Build Next.js Static Export
echo " Building Next.js application..."
if [ -f "package.json" ]; then
    npm run build
else
    echo "Warning: package.json not found in root. Skipping frontend npm build."
fi

# 3. Copy Frontend files to deploy_me
if [ -d "out" ]; then
    echo " Copying static export 'out' files to deploy_me/..."
    cp -r out/* deploy_me/
else
    echo "Warning: Next.js static build directory 'out' does not exist."
fi

# 4. Copy Backend components to deploy_me/api
if [ -d "backend" ]; then
    echo " Copying backend components to deploy_me/api/..."
    mkdir -p deploy_me/api
    cp -r backend/* deploy_me/api/
else
    echo "Warning: Backend source directory not found."
fi

echo "============================================="
echo "Packaging complete!"
echo "Please compress the contents of the 'deploy_me' folder and upload them to your cPanel public_html directory."
echo "============================================="
