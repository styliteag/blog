# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based static website for Stylite AG, a German IT company specializing in storage solutions, cybersecurity, and open-source technologies. The site features:

- **Hugo Static Site Generator** with Blowfish theme
- **Multi-language support** (English, German, Italian, Japanese, Chinese)
- **TailwindCSS** for styling with custom Stylite branding
- **Blog functionality** with imported WordPress content
- **Project showcase** section

## Common Development Commands

### Development
```bash
npm run dev              # Start Hugo development server with drafts
npm run build           # Build production site (minified)
npm run build-css       # Build and watch TailwindCSS
```

### Content Management
```bash
hugo new blog/post-name.md          # Create new blog post
hugo new projects/project-name.md   # Create new project page
```

### WordPress Import (if needed)
```bash
node scripts/wordpress-import.js path/to/export.xml
node scripts/convert-posts.js       # Convert imported posts format
node scripts/clean-html.js          # Clean HTML content
node scripts/fix-links.js           # Fix internal links
```

## Architecture & Structure

### Theme System
- **Base theme**: Blowfish (located in `themes/blowfish/`)
- **Custom styling**: TailwindCSS configuration in `tailwind.config.js`
- **Brand colors**: Stylite red (#dc2626), dark theme (#111111)
- **Custom layouts**: Override Blowfish templates in `layouts/` directory

### Content Structure
```
content/
├── blog/           # Blog posts (German technical content)
├── projects/       # Project showcases
└── pages/          # Static pages (about, etc.)
```

### Configuration
- **Main config**: `config/_default/hugo.toml`
- **Languages**: Separate config files for each language
- **Menus**: Language-specific menu configurations
- **Params**: Site-wide parameters in `params.toml`

### Deployment
- **Netlify**: Uses `netlify.toml` with Hugo 0.121.0
- **Vercel**: Uses `vercel.json` with same Hugo version
- **Docker**: Self-hosted deployment with automatic git sync
- **Security headers**: Configured in all deployment configs

## Content Guidelines

### Blog Posts
- **Language**: Primarily German (company focus)
- **Topics**: Storage solutions, cybersecurity, open-source, TrueNAS, ZFS
- **Images**: 1280x400px headers, dark theme compatible
- **Frontmatter**: Use categories and tags for organization

### Image Management
- **Blog headers**: Follow specifications in `image-specifications.md`
- **Static assets**: Store in `static/images/`
- **Imported content**: WordPress images in `static/images/imported/`

### Custom Shortcodes (Available)
- `{{< video >}}` - YouTube embeds with thumbnails
- `{{< github >}}` - GitHub repository cards
- `{{< gallery >}}` - Image galleries
- `{{< screenshot >}}` - Screenshot displays

## Development Notes

### WordPress Migration
- Import scripts are available in `scripts/` directory
- Historical blog content was migrated from WordPress
- Images were downloaded and optimized during import
- URLs and internal links were fixed post-import

### Multi-language Support
- Site supports 5 languages with separate content trees
- Each language has its own menu and parameter configuration
- Content should be created in appropriate language directories

### Brand Identity
- Dark theme with red accents (Stylite brand colors)
- Professional, technical aesthetic for B2B audience
- German company serving enterprise storage market

## Docker Deployment

### Self-Hosted Deployment Commands
```bash
# Quick start
docker-compose up -d homepage gitsync

# With SSL/Traefik
docker-compose --profile traefik up -d

# View logs
docker-compose logs -f gitsync

# Manual sync
docker-compose exec gitsync /app/sync/sync-and-build.sh once
```

### Git Sync Workflow
1. **Develop locally**: Make changes to Hugo site
2. **Push to git**: `git push origin main`
3. **Automatic deployment**: Site updates within 5 minutes

### Configuration
- **Environment**: Copy `.env.example` to `.env` and configure
- **Git repository**: Set `GIT_REPO_URL` in environment
- **Sync interval**: Configurable via `SYNC_INTERVAL` (default: 300s)
- **SSL**: Optional Traefik integration for HTTPS

### Deployment Files
- `Dockerfile` - Multi-stage build for Hugo site
- `docker-compose.yml` - Service orchestration
- `docker/nginx.conf` - Nginx configuration with security headers
- `docker/sync-and-build.sh` - Git sync and build script
- `DEPLOYMENT.md` - Detailed deployment guide