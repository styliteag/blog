#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class HTMLCleaner {
  constructor(inputDir = './content/blog') {
    this.inputDir = inputDir;
  }

  async clean() {
    const files = fs.readdirSync(this.inputDir).filter(file => file.endsWith('.md'));
    
    console.log(`Cleaning HTML from ${files.length} posts...`);
    
    for (const file of files) {
      if (file === '_index.md' || file === 'sample-post.md') continue;
      
      const filePath = path.join(this.inputDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const cleaned = this.cleanContent(content);
      
      // Write cleaned content back
      fs.writeFileSync(filePath, cleaned, 'utf8');
      console.log(`Cleaned: ${file}`);
    }
    
    console.log('All posts cleaned successfully!');
  }

  cleanContent(content) {
    // Split frontmatter and content
    const parts = content.split('---');
    if (parts.length < 3) return content;
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');
    
    // Clean the body content
    const cleanedBody = this.cleanHTML(body);
    
    return `---${frontmatter}---\n\n${cleanedBody}`;
  }

  cleanHTML(html) {
    return html
      // Remove paragraph tags with empty or class attributes
      .replace(/<p[^>]*>/g, '')
      .replace(/<\/p>/g, '\n\n')
      
      // Convert ordered lists
      .replace(/<ol[^>]*>/g, '')
      .replace(/<\/ol>/g, '\n')
      
      // Convert unordered lists
      .replace(/<ul[^>]*>/g, '')
      .replace(/<\/ul>/g, '\n')
      
      // Convert list items
      .replace(/<li[^>]*>/g, '- ')
      .replace(/<\/li>/g, '\n')
      
      // Convert strong/bold tags
      .replace(/<strong[^>]*>/g, '**')
      .replace(/<\/strong>/g, '**')
      .replace(/<b[^>]*>/g, '**')
      .replace(/<\/b>/g, '**')
      
      // Convert em/italic tags
      .replace(/<em[^>]*>/g, '*')
      .replace(/<\/em>/g, '*')
      .replace(/<i[^>]*>/g, '*')
      .replace(/<\/i>/g, '*')
      
      // Convert links (preserve existing ones)
      .replace(/<a[^>]+href="([^"]+)"[^>]*>/g, '[')
      .replace(/<\/a>/g, ']($1)')
      
      // Fix link syntax - this is a bit tricky, need to handle it properly
      .replace(/\]\(\$1\)/g, (match, offset, string) => {
        // Find the corresponding opening bracket and extract href
        const beforeMatch = string.substring(0, offset);
        const hrefMatch = beforeMatch.match(/href="([^"]+)"[^>]*>\[$/);
        if (hrefMatch) {
          return `](${hrefMatch[1]})`;
        }
        return match;
      })
      
      // Convert line breaks
      .replace(/<br[^>]*>/g, '\n')
      
      // Convert divs to paragraphs (remove div tags)
      .replace(/<div[^>]*>/g, '')
      .replace(/<\/div>/g, '\n\n')
      
      // Convert headings (if any missed)
      .replace(/<h1[^>]*>/g, '# ')
      .replace(/<\/h1>/g, '\n\n')
      .replace(/<h2[^>]*>/g, '## ')
      .replace(/<\/h2>/g, '\n\n')
      .replace(/<h3[^>]*>/g, '### ')
      .replace(/<\/h3>/g, '\n\n')
      .replace(/<h4[^>]*>/g, '#### ')
      .replace(/<\/h4>/g, '\n\n')
      .replace(/<h5[^>]*>/g, '##### ')
      .replace(/<\/h5>/g, '\n\n')
      .replace(/<h6[^>]*>/g, '###### ')
      .replace(/<\/h6>/g, '\n\n')
      
      // Remove any remaining HTML tags
      .replace(/<[^>]+>/g, '')
      
      // Clean up HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#8211;/g, '-')
      .replace(/&#8212;/g, '--')
      .replace(/&#8216;/g, "'")
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8222;/g, '"')
      .replace(/&#8230;/g, '...')
      
      // Clean up excessive whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/^\s+|\s+$/g, '')
      .replace(/[ \t]+/g, ' ')
      
      // Fix markdown formatting issues
      .replace(/\*\*\s+/g, '**')
      .replace(/\s+\*\*/g, '**')
      .replace(/\*\s+/g, '*')
      .replace(/\s+\*/g, '*')
      
      // Clean up list formatting
      .replace(/\n- \n/g, '\n- ')
      .replace(/\n\n- /g, '\n- ')
      
      .trim();
  }
}

// Run cleaning
if (require.main === module) {
  const cleaner = new HTMLCleaner();
  cleaner.clean();
}

module.exports = HTMLCleaner;