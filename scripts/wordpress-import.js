#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const fetch = require('node-fetch');

class WordPressImporter {
  constructor(xmlFilePath, outputDir = './content/blog') {
    this.xmlFilePath = xmlFilePath;
    this.outputDir = outputDir;
    this.imageDir = './static/images/imported';
    this.downloadedImages = new Map();
  }

  async import() {
    try {
      console.log('Starting WordPress import...');
      
      // Read and parse XML
      const xmlContent = fs.readFileSync(this.xmlFilePath, 'utf8');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(xmlContent);
      
      // Extract posts
      const items = result.rss.channel[0].item || [];
      const posts = items.filter(item => 
        item['wp:post_type'] && 
        item['wp:post_type'][0] === 'post' &&
        item['wp:status'] && 
        item['wp:status'][0] === 'publish'
      );
      
      console.log(`Found ${posts.length} published posts`);
      
      // Create output directories
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }
      if (!fs.existsSync(this.imageDir)) {
        fs.mkdirSync(this.imageDir, { recursive: true });
      }
      
      // Process each post
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(`Processing post ${i + 1}/${posts.length}: ${post.title[0]}`);
        await this.processPost(post);
      }
      
      console.log('WordPress import completed successfully!');
      console.log(`Imported ${posts.length} posts to ${this.outputDir}`);
      
    } catch (error) {
      console.error('Import failed:', error);
      process.exit(1);
    }
  }

  async processPost(post) {
    const title = post.title[0];
    const content = post['content:encoded'] ? post['content:encoded'][0] : '';
    const excerpt = post.excerpt ? post.excerpt[0] : '';
    const date = new Date(post.pubDate[0]);
    const slug = post['wp:post_name'][0] || this.slugify(title);
    
    // Extract categories and tags
    const categories = [];
    const tags = [];
    
    if (post.category) {
      post.category.forEach(cat => {
        if (cat.$.domain === 'category') {
          categories.push(cat.$.nicename);
        } else if (cat.$.domain === 'post_tag') {
          tags.push(cat.$.nicename);
        }
      });
    }
    
    // Process content - convert HTML to Markdown-ish
    let processedContent = await this.processContent(content);
    
    // Create frontmatter
    const frontmatter = {
      title: title,
      date: date.toISOString(),
      slug: slug,
      categories: categories,
      tags: tags,
      draft: false
    };
    
    if (excerpt) {
      frontmatter.description = this.stripHtml(excerpt);
    }
    
    // Generate filename
    const filename = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${slug}.md`;
    const filepath = path.join(this.outputDir, filename);
    
    // Write file
    const fileContent = this.generateMarkdownFile(frontmatter, processedContent);
    fs.writeFileSync(filepath, fileContent, 'utf8');
    
    console.log(`  → Created: ${filename}`);
  }

  async processContent(content) {
    // Download images and update references
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const imgUrl = match[1];
      const newPath = await this.downloadImage(imgUrl);
      if (newPath) {
        content = content.replace(imgUrl, newPath);
      }
    }
    
    // Basic HTML to Markdown conversion
    content = content
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1')
      .replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1')
      .replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1')
      .replace(/<h4[^>]*>(.*?)<\/h4>/g, '#### $1')
      .replace(/<h5[^>]*>(.*?)<\/h5>/g, '##### $1')
      .replace(/<h6[^>]*>(.*?)<\/h6>/g, '###### $1')
      
      // Bold and italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*')
      
      // Links
      .replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
      
      // Code blocks
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gs, '```\\n$1\\n```')
      .replace(/<code[^>]*>(.*?)<\/code>/g, '`$1`')
      
      // Lists
      .replace(/<ul[^>]*>/g, '')
      .replace(/<\/ul>/g, '')
      .replace(/<ol[^>]*>/g, '')
      .replace(/<\/ol>/g, '')
      .replace(/<li[^>]*>(.*?)<\/li>/g, '- $1')
      
      // Paragraphs
      .replace(/<p[^>]*>/g, '')
      .replace(/<\/p>/g, '\\n\\n')
      
      // Line breaks
      .replace(/<br[^>]*>/g, '\\n')
      
      // Remove remaining HTML tags
      .replace(/<[^>]+>/g, '')
      
      // Clean up whitespace
      .replace(/\\n\\n\\n+/g, '\\n\\n')
      .replace(/^\\n+|\\n+$/g, '')
      .trim();
    
    return content;
  }

  async downloadImage(url) {
    try {
      if (this.downloadedImages.has(url)) {
        return this.downloadedImages.get(url);
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`  → Failed to download image: ${url}`);
        return null;
      }
      
      const urlPath = new URL(url).pathname;
      const filename = path.basename(urlPath) || 'image.jpg';
      const filepath = path.join(this.imageDir, filename);
      
      // Ensure unique filename
      let counter = 1;
      let finalPath = filepath;
      while (fs.existsSync(finalPath)) {
        const ext = path.extname(filename);
        const name = path.basename(filename, ext);
        finalPath = path.join(this.imageDir, `${name}-${counter}${ext}`);
        counter++;
      }
      
      const buffer = await response.buffer();
      fs.writeFileSync(finalPath, buffer);
      
      const relativePath = `/images/imported/${path.basename(finalPath)}`;
      this.downloadedImages.set(url, relativePath);
      
      console.log(`  → Downloaded image: ${path.basename(finalPath)}`);
      return relativePath;
      
    } catch (error) {
      console.warn(`  → Error downloading image ${url}:`, error.message);
      return null;
    }
  }

  generateMarkdownFile(frontmatter, content) {
    const yaml = Object.entries(frontmatter)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length === 0) return '';
          return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
        }
        return `${key}: "${value}"`;
      })
      .filter(line => line)
      .join('\\n');
    
    return `---\\n${yaml}\\n---\\n\\n${content}`;
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  stripHtml(text) {
    return text.replace(/<[^>]+>/g, '').trim();
  }
}

// CLI usage
if (require.main === module) {
  const xmlFile = process.argv[2];
  if (!xmlFile) {
    console.error('Usage: node wordpress-import.js <wordpress-export.xml>');
    process.exit(1);
  }
  
  if (!fs.existsSync(xmlFile)) {
    console.error(`File not found: ${xmlFile}`);
    process.exit(1);
  }
  
  const importer = new WordPressImporter(xmlFile);
  importer.import();
}

module.exports = WordPressImporter;