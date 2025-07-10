#!/bin/bash

# FIO Analyzer Docker Registry Push Script

set -e

# Configuration
REGISTRY_URL="${DOCKER_REGISTRY:-docker.io}"  # Default to Docker Hub
NAMESPACE="${DOCKER_NAMESPACE:-styliteag}"  # Change this to your username/organization

# Read version from VERSION file
if [ -f "../VERSION" ]; then
    VERSION=$(cat "../VERSION")
    VERSION_TAG="v${VERSION}"
else
    VERSION_TAG="latest"
fi

echo "🚀 Pushing StyliteAG Blog images to registry..."
echo "Registry: ${REGISTRY_URL}"
echo "Namespace: ${NAMESPACE}"
echo "Tag: ${IMAGE_TAG}"
echo ""


# Build the images first
echo "🔨 Building images..."

cd ..
docker build -t styliteag/blog:${VERSION_TAG} -f docker/Dockerfile .
docker build -t styliteag/gitsync:${VERSION_TAG} -f docker/gitsync.Dockerfile .

echo "🏷️  Tagging images..."

docker tag styliteag/blog:${VERSION_TAG} ${REGISTRY_URL}/${NAMESPACE}/blog:${VERSION_TAG}
docker tag styliteag/gitsync:${VERSION_TAG} ${REGISTRY_URL}/${NAMESPACE}/gitsync:${VERSION_TAG}
docker tag styliteag/blog:${VERSION_TAG} ${REGISTRY_URL}/${NAMESPACE}/blog:latest
docker tag styliteag/gitsync:${VERSION_TAG} ${REGISTRY_URL}/${NAMESPACE}/gitsync:latest

echo "📤 Pushing images to registry..."

docker push ${REGISTRY_URL}/${NAMESPACE}/blog:${VERSION_TAG}
docker push ${REGISTRY_URL}/${NAMESPACE}/gitsync:${VERSION_TAG}
docker push ${REGISTRY_URL}/${NAMESPACE}/blog:latest
docker push ${REGISTRY_URL}/${NAMESPACE}/gitsync:latest

echo ""
echo "✅ Images pushed successfully!"
echo ""
echo "📋 Image URL:"
echo "   Blog:     ${REGISTRY_URL}/${NAMESPACE}/blog:${VERSION_TAG}"
echo "   Gitsync:  ${REGISTRY_URL}/${NAMESPACE}/gitsync:${VERSION_TAG}"