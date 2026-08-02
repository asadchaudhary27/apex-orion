const fs = require('fs');
const path = require('path');

const filesToFix = [
  'e:/Apex orion/src/components/sections/ContactForm.tsx',
  'e:/Apex orion/src/components/sections/FeaturedWork.tsx',
  'e:/Apex orion/src/components/sections/ProjectsGrid.tsx',
  'e:/Apex orion/src/components/sections/ServicesGrid.tsx',
  'e:/Apex orion/src/components/sections/TeamSection.tsx',
  'e:/Apex orion/src/pages/Softwares.tsx',
  'e:/Apex orion/src/components/common/IntroScreen.tsx'
];

for (const file of filesToFix) {
  if (!fs.existsSync(file)) {
    console.log(`Skipping ${file} - not found`);
    continue;
  }
  
  let content = fs.readFileSync(file, 'utf8');

  // Universal replacements
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/border-black\/10/g, 'border-white/10');
  content = content.replace(/border-black\/5/g, 'border-white/10'); // For FeaturedWork
  content = content.replace(/border-black\/20/g, 'border-white/20');
  content = content.replace(/bg-black\/\[0\.03\]/g, 'bg-white/[0.03]');
  content = content.replace(/bg-black\/\[0\.05\]/g, 'bg-white/[0.05]');
  
  // File specific replacements
  if (file.includes('ContactForm.tsx')) {
    content = content.replace(/bg-white\/60/g, 'bg-[#0a0a0a]/90');
    content = content.replace(/bg-white/g, 'bg-black');
    content = content.replace(/bg-slate-50/g, 'bg-[#0a0a0a]');
  }
  
  if (file.includes('FeaturedWork.tsx')) {
    content = content.replace(/bg-white\/40/g, 'bg-white/[0.05]');
    content = content.replace(/bg-white\/60/g, 'bg-[#0a0a0a]/90');
    content = content.replace(/bg-white\/90/g, 'bg-[#0a0a0a]/90');
    content = content.replace(/text-gray-900\/50/g, 'text-gray-400/50');
  }

  if (file.includes('ProjectsGrid.tsx')) {
    content = content.replace(/bg-white\/90/g, 'bg-black/90');
  }

  if (file.includes('ServicesGrid.tsx')) {
    content = content.replace(/bg-white/g, 'bg-black');
  }

  if (file.includes('TeamSection.tsx')) {
    content = content.replace(/bg-white/g, 'bg-black');
  }

  if (file.includes('Softwares.tsx')) {
    content = content.replace(/bg-white/g, 'bg-black');
  }

  if (file.includes('IntroScreen.tsx')) {
    content = content.replace(/bg-white/g, 'bg-[#050505]');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed ${file}`);
}
