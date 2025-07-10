---
title: "Uptime Kuma"
date: 2024-01-10T12:00:00Z
tags: ["Node.js", "Vue.js", "Docker", "Monitoring"]
categories: ["Monitoring"]
description: "A self-hosted monitoring tool for uptime and performance tracking."
---

# Uptime Kuma

A fancy self-hosted monitoring tool for tracking uptime and performance of your services.

## Features

- **Real-time monitoring**: Track HTTP, TCP, DNS, and more
- **Beautiful dashboard**: Clean, intuitive interface
- **Notifications**: Multiple notification channels (Discord, Slack, Email, etc.)
- **Multi-language support**: Available in 20+ languages
- **Docker support**: Easy deployment with Docker

## Screenshots

<!-- Gallery placeholder - images would go here -->

## Quick Start

### Docker Deployment

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1
```

### Manual Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the server: `npm start`

## Configuration

<!-- Configuration screenshot would go here -->

## Monitoring Types

- **HTTP/HTTPS**: Monitor web services
- **TCP**: Monitor TCP ports
- **DNS**: Monitor DNS resolution
- **Push**: Receive monitoring data via push

## Integration

Integrates seamlessly with:
- Docker environments
- Kubernetes clusters
- Traditional server setups

**GitHub Repository**: [styliteag/uptime-kuma](https://github.com/styliteag/uptime-kuma) - Our enhanced fork with additional features for enterprise environments

## Enterprise Features

Our fork includes additional enterprise-focused features:
- Enhanced security configurations
- Advanced alerting rules
- Custom dashboard themes
- Extended monitoring capabilities

Perfect for organizations requiring robust monitoring solutions with enterprise-grade features.