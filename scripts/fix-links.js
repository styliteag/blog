#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class LinkFixer {
  constructor(inputDir = './content/blog') {
    this.inputDir = inputDir;
  }

  async fix() {
    const files = fs.readdirSync(this.inputDir).filter(file => file.endsWith('.md'));
    
    console.log(`Fixing links in ${files.length} posts...`);
    
    for (const file of files) {
      if (file === '_index.md' || file === 'sample-post.md') continue;
      
      const filePath = path.join(this.inputDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const fixed = this.fixContent(content);
      
      // Write fixed content back
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`Fixed: ${file}`);
    }
    
    console.log('All links fixed successfully!');
  }

  fixContent(content) {
    return content
      // Fix broken links with ($1)
      .replace(/\]\(\$1\)/g, ']()')
      
      // Fix space issues in markdown formatting
      .replace(/\*\*([^*]+)\*\*/g, (match, p1) => `**${p1.trim()}**`)
      
      // Fix list formatting - add space after dash
      .replace(/^(\s*)- ([A-Z])/gm, '$1- $2')
      .replace(/^(\s*)- ([a-z])/gm, '$1- $2')
      .replace(/^(\s*)- \*\*/gm, '$1- **')
      
      // Fix headers that got concatenated
      .replace(/\*\*## /g, '\n\n## ')
      .replace(/\*### /g, '\n\n### ')
      
      // Fix line breaks and spacing
      .replace(/\n\n\n+/g, '\n\n')
      .replace(/\s+$/gm, '')
      .replace(/^\s*- \s*$/gm, '')
      
      // Remove empty list items
      .replace(/^- \s*\n/gm, '')
      
      // Fix paragraph spacing
      .replace(/([.!?])\*\*([A-Z])/g, '$1\n\n**$2')
      .replace(/([.!?])([A-Z][a-z])/g, '$1 $2')
      
      .trim();
  }
}

// Run fixing
if (require.main === module) {
  const fixer = new LinkFixer();
  fixer.fix();
}

module.exports = LinkFixer;