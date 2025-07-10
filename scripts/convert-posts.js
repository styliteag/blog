#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class PostConverter {
  constructor(inputDir = './content/blog', outputDir = './content/blog') {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
  }

  async convert() {
    const files = fs.readdirSync(this.inputDir).filter(file => file.endsWith('.md'));
    
    console.log(`Converting ${files.length} posts...`);
    
    for (const file of files) {
      if (file === '_index.md' || file === 'sample-post.md') continue;
      
      const filePath = path.join(this.inputDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const converted = this.convertPost(content);
      
      // Write converted content back
      fs.writeFileSync(filePath, converted, 'utf8');
      console.log(`Converted: ${file}`);
    }
    
    console.log('All posts converted successfully!');
  }

  convertPost(content) {
    // Split frontmatter and content
    const parts = content.split('---');
    if (parts.length < 3) return content;
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');
    
    // Parse frontmatter
    const fm = this.parseFrontmatter(frontmatter);
    
    // Convert body
    const convertedBody = this.convertBody(body);
    
    // Generate new frontmatter
    const newFrontmatter = this.generateFrontmatter(fm);
    
    return `---\n${newFrontmatter}\n---\n\n${convertedBody}`;
  }

  parseFrontmatter(frontmatter) {
    const lines = frontmatter.split('\n');
    const result = {};
    
    let currentKey = null;
    let currentValue = '';
    let inMultiline = false;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      if (trimmed.startsWith('- ') && currentKey === 'footnotes') {
        // Handle footnotes array
        continue;
      }
      
      if (trimmed.includes(':') && !inMultiline) {
        if (currentKey) {
          result[currentKey] = currentValue.trim();
        }
        
        const [key, ...valueParts] = trimmed.split(':');
        currentKey = key.trim();
        currentValue = valueParts.join(':').trim();
        
        if (currentValue.startsWith("'") && !currentValue.endsWith("'")) {
          inMultiline = true;
          currentValue = currentValue.substring(1);
        } else if (currentValue.startsWith("'") && currentValue.endsWith("'")) {
          currentValue = currentValue.substring(1, currentValue.length - 1);
        }
      } else if (inMultiline) {
        currentValue += ' ' + trimmed;
        if (trimmed.endsWith("'")) {
          inMultiline = false;
          currentValue = currentValue.substring(0, currentValue.length - 1);
        }
      } else if (currentKey) {
        currentValue += ' ' + trimmed;
      }
    }
    
    if (currentKey) {
      result[currentKey] = currentValue.trim();
    }
    
    return result;
  }

  generateFrontmatter(fm) {
    const result = [];
    
    // Title
    if (fm.title) {
      result.push(`title: "${fm.title}"`);
    }
    
    // Date
    if (fm.date) {
      result.push(`date: ${fm.date}`);
    }
    
    // Draft
    result.push('draft: false');
    
    // Author
    if (fm.author) {
      result.push(`authors: ["${fm.author}"]`);
    }
    
    // Categories
    if (fm.categories) {
      const categories = Array.isArray(fm.categories) ? fm.categories : [fm.categories];
      result.push(`categories: [${categories.map(c => `"${c}"`).join(', ')}]`);
    }
    
    // Tags - convert categories to tags for now
    if (fm.categories) {
      const categories = Array.isArray(fm.categories) ? fm.categories : [fm.categories];
      const tags = categories.map(c => c.replace(/[^a-zA-Z0-9]/g, ' ').trim().toLowerCase());
      result.push(`tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
    }
    
    // Featured image
    if (fm.featured_image) {
      const imagePath = fm.featured_image.replace('/wp-content/uploads/', '/images/');
      result.push(`featured_image: "${imagePath}"`);
    }
    
    // Description - extract from title or content
    if (fm.title) {
      const desc = fm.title.length > 100 ? fm.title.substring(0, 100) + '...' : fm.title;
      result.push(`description: "${desc}"`);
    }
    
    return result.join('\n');
  }

  convertBody(body) {
    return body
      // Remove WordPress specific HTML classes
      .replace(/\{\.gb-headline[^}]*\}/g, '')
      .replace(/\{\.wp-block-[^}]*\}/g, '')
      .replace(/class="[^"]*gb-[^"]*"/g, '')
      .replace(/class="[^"]*wp-block-[^"]*"/g, '')
      .replace(/class="has-text-align-left"/g, '')
      
      // Clean up HTML
      .replace(/<p class="[^"]*">/g, '<p>')
      .replace(/<ol class="[^"]*">/g, '<ol>')
      .replace(/<ul class="[^"]*">/g, '<ul>')
      
      // Convert image paths
      .replace(/\/wp-content\/uploads\//g, '/images/')
      
      // Remove footnote references for now (complex to convert)
      .replace(/<sup data-fn="[^"]*" class="fn">.*?<\/sup>/g, '')
      
      // Clean up HTML entities
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8222;/g, '"')
      .replace(/&#8230;/g, '...')
      
      // Remove empty lines
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  }
}

// Run conversion
if (require.main === module) {
  const converter = new PostConverter();
  converter.convert();
}

module.exports = PostConverter;