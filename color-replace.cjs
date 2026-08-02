const fs = require('fs');
const path = require('path');

const replacements = [
  // Hex replacements
  { regex: /text-\[\#FF5722\]/g, replacement: 'text-cyan-400' },
  { regex: /bg-\[\#FF5722\]/g, replacement: 'bg-cyan-500' },
  { regex: /border-\[\#FF5722\]/g, replacement: 'border-cyan-500/50' },
  { regex: /from-\[\#FF5722\]/g, replacement: 'from-indigo-600' },
  { regex: /\[\#FF5722\]/g, replacement: '#06b6d4' }, // Fallback for any other hex usage

  // Gradient replacements
  { regex: /to-amber-500/g, replacement: 'to-cyan-400' },
  { regex: /via-orange-600/g, replacement: 'via-indigo-400' },
  { regex: /via-orange-[0-9]+/g, replacement: 'via-indigo-500' },
  { regex: /from-amber-[0-9]+/g, replacement: 'from-indigo-600' },
  { regex: /to-orange-[0-9]+/g, replacement: 'to-cyan-500' },
  { regex: /from-rose-[0-9]+/g, replacement: 'from-indigo-900' },

  // Shadow RGBA replacements (255,87,34 is #FF5722)
  { regex: /rgba\(255,87,34,/g, replacement: 'rgba(6,182,212,' },

  // GlassCard glowColor prop
  { regex: /glowColor="orange"/g, replacement: 'glowColor="cyan"' },

  // Specific amber/orange text/bg that might have been used
  { regex: /text-orange-500/g, replacement: 'text-cyan-400' },
  { regex: /text-amber-500/g, replacement: 'text-cyan-400' },
];

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
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
console.log('Color replacement complete.');
