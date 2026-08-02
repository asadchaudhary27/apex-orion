const fs = require('fs');
const path = require('path');

const replacements = [
  // Hex replacements
  { regex: /text-cyan-400/g, replacement: 'text-[#FF5722]' },
  { regex: /text-cyan-500/g, replacement: 'text-[#FF5722]' },
  { regex: /bg-cyan-500/g, replacement: 'bg-[#FF5722]' },
  { regex: /bg-cyan-400/g, replacement: 'bg-[#FF5722]' },
  { regex: /border-cyan-500\/50/g, replacement: 'border-[#FF5722]/50' },
  { regex: /border-cyan-500\/30/g, replacement: 'border-[#FF5722]/30' },
  { regex: /border-cyan-500/g, replacement: 'border-[#FF5722]' },
  { regex: /from-indigo-600/g, replacement: 'from-[#FF5722]' },
  { regex: /from-indigo-500/g, replacement: 'from-[#FF5722]' },
  { regex: /to-cyan-400/g, replacement: 'to-[#FF8A65]' },
  { regex: /to-cyan-500/g, replacement: 'to-[#FF8A65]' },
  { regex: /via-indigo-400/g, replacement: 'via-orange-600' },
  { regex: /via-indigo-500/g, replacement: 'via-orange-500' },
  { regex: /#06b6d4/g, replacement: '#FF5722' },

  // Shadow RGBA replacements (6,182,212 is #06b6d4)
  { regex: /rgba\(6,182,212,/g, replacement: 'rgba(255,87,34,' },
];

const excludeFiles = [
  'ProjectsGrid.tsx', 
  'ServicesGrid.tsx', 
  'ServiceDetail.tsx', 
  'TiltCard.tsx',
  'GlassCard.tsx',
  'Projects.tsx',
  'Softwares.tsx',
  'Services.tsx'
];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      if (excludeFiles.some(ex => fullPath.includes(ex))) {
        return; // Skip cards / grid files
      }

      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

processDirectory(path.join(__dirname, 'src'));
console.log('Orange replacement complete.');
