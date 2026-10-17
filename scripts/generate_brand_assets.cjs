const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  let offset = 6 + (16 * count);

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function generateBrandAssets() {
  console.log('--- Generating Missing Logos, Favicons & Social Graph Assets ---');

  const tabLogoPath = path.join(publicDir, 'tab_logo.png');
  const baseImg = sharp(tabLogoPath).trim();

  // 1. Generate Favicon sizes
  console.log('Generating favicon PNG sizes...');
  const buf16 = await sharp(tabLogoPath).trim().resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf32 = await sharp(tabLogoPath).trim().resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf48 = await sharp(tabLogoPath).trim().resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf180 = await sharp(tabLogoPath).trim().resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf192 = await sharp(tabLogoPath).trim().resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf512 = await sharp(tabLogoPath).trim().resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buf16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buf32);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), buf48);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buf180);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), buf192);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), buf512);

  // 2. Generate multi-size favicon.ico
  console.log('Generating multi-resolution favicon.ico...');
  const faviconIco = createIco([buf16, buf32, buf48], [16, 32, 48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconIco);

  // 3. Generate ApexRx Pharmacy Software Icon
  console.log('Generating ApexRx Manager logo & icon...');
  const rxSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#022c22"/>
        <stop offset="50%" stop-color="#064e3b"/>
        <stop offset="100%" stop-color="#047857"/>
      </linearGradient>
      <linearGradient id="glowGrad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#34d399" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="crossGrad" x1="150" y1="150" x2="362" y2="362" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#a7f3d0"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#059669" flood-opacity="0.5"/>
      </filter>
    </defs>
    <!-- Background Card -->
    <rect width="512" height="512" rx="110" fill="url(#bgGrad)"/>
    <rect x="8" y="8" width="496" height="496" rx="102" stroke="#34d399" stroke-width="4" stroke-opacity="0.4"/>
    <circle cx="256" cy="256" r="180" fill="url(#glowGrad)" filter="url(#shadow)"/>
    
    <!-- Medical Cross -->
    <path d="M216 120H296V216H392V296H296V392H216V296H120V216H216V120Z" fill="url(#crossGrad)" filter="url(#shadow)"/>
    
    <!-- Capsule Pill Symbol in Center -->
    <g transform="translate(256, 256) rotate(-45) translate(-256, -256)">
      <rect x="226" y="196" width="60" height="120" rx="30" fill="#047857" stroke="#ffffff" stroke-width="6"/>
      <path d="M226 256H286" stroke="#ffffff" stroke-width="6"/>
      <path d="M226 226C226 209.431 239.431 196 256 196C272.569 196 286 209.431 286 226V256H226V226Z" fill="#10b981"/>
    </g>
  </svg>
  `;
  const rx512 = await sharp(Buffer.from(rxSvg)).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apexrx.png'), rx512);
  const rx16 = await sharp(rx512).resize(16, 16).png().toBuffer();
  const rx32 = await sharp(rx512).resize(32, 32).png().toBuffer();
  const rx48 = await sharp(rx512).resize(48, 48).png().toBuffer();
  const rxIco = createIco([rx16, rx32, rx48], [16, 32, 48]);
  fs.writeFileSync(path.join(publicDir, 'apexrx.ico'), rxIco);

  // 4. Generate Bespoke Custom Software Logo & Icon
  console.log('Generating Bespoke Custom Software logo & icon...');
  const customSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#18181b"/>
        <stop offset="60%" stop-color="#09090b"/>
        <stop offset="100%" stop-color="#1c1917"/>
      </linearGradient>
      <linearGradient id="cAccent" x1="100" y1="100" x2="412" y2="412" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ff7a00"/>
        <stop offset="100%" stop-color="#FF5722"/>
      </linearGradient>
      <filter id="cShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#FF5722" flood-opacity="0.6"/>
      </filter>
    </defs>
    <!-- Background -->
    <rect width="512" height="512" rx="110" fill="url(#cBg)"/>
    <rect x="8" y="8" width="496" height="496" rx="102" stroke="url(#cAccent)" stroke-width="5" stroke-opacity="0.6"/>
    
    <!-- Code Bracket Left -->
    <path d="M180 160L100 256L180 352" stroke="url(#cAccent)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" filter="url(#cShadow)"/>
    
    <!-- Code Bracket Right -->
    <path d="M332 160L412 256L332 352" stroke="url(#cAccent)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" filter="url(#cShadow)"/>
    
    <!-- Central Hexagonal Core & Cog -->
    <path d="M256 180L310 211V273L256 304L202 273V211L256 180Z" fill="url(#cAccent)" filter="url(#cShadow)"/>
    <circle cx="256" cy="242" r="26" fill="#09090b"/>
    <circle cx="256" cy="242" r="14" fill="#ffffff"/>
  </svg>
  `;
  const custom512 = await sharp(Buffer.from(customSvg)).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'custom_software.png'), custom512);
  const custom16 = await sharp(custom512).resize(16, 16).png().toBuffer();
  const custom32 = await sharp(custom512).resize(32, 32).png().toBuffer();
  const custom48 = await sharp(custom512).resize(48, 48).png().toBuffer();
  const customIco = createIco([custom16, custom32, custom48], [16, 32, 48]);
  fs.writeFileSync(path.join(publicDir, 'custom_software.ico'), customIco);

  // 5. Generate Official OpenGraph 1200x630 Card
  console.log('Generating 1200x630 OpenGraph og-image.png...');
  const logoBuf = await sharp(tabLogoPath).trim().resize(220, 220, { fit: 'contain' }).png().toBuffer();

  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="radial1" cx="950" cy="150" r="500" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FF5722" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="radial2" cx="200" cy="500" r="450" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ff7a00" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="titleGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#FF5722"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Deep Dark Canvas -->
    <rect width="1200" height="630" fill="#050505"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <rect width="1200" height="630" fill="url(#radial1)"/>
    <rect width="1200" height="630" fill="url(#radial2)"/>

    <!-- Subtle Outer Border -->
    <rect x="24" y="24" width="1152" height="582" rx="24" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2"/>

    <!-- Top Badge -->
    <g transform="translate(80, 80)">
      <rect width="320" height="38" rx="19" fill="rgba(255, 87, 34, 0.12)" stroke="rgba(255, 87, 34, 0.4)" stroke-width="1.5"/>
      <circle cx="20" cy="19" r="5" fill="#FF5722"/>
      <text x="36" y="24" fill="#FF5722" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">ENTERPRISE SOFTWARE AGENCY</text>
    </g>

    <!-- Headline -->
    <text x="80" y="190" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">
      ApexOrion <tspan fill="#FF5722">Tech</tspan>
    </text>

    <!-- Subtitle -->
    <text x="80" y="245" fill="#e5e5e5" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600">
      Custom Software, Web &amp; Offline POS Development
    </text>

    <!-- Descriptive text -->
    <text x="80" y="295" fill="#a3a3a3" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400">
      Sub-Second Performance • 100% Offline-First Architecture • Global Enterprise Solutions
    </text>

    <!-- Feature Tags -->
    <g transform="translate(80, 360)">
      <!-- Tag 1 -->
      <g>
        <rect width="210" height="42" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="20" y="26" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">⚡ Sub-Second Speed</text>
      </g>
      <!-- Tag 2 -->
      <g transform="translate(225, 0)">
        <rect width="235" height="42" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="20" y="26" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">🛡️ 100% Offline-First POS</text>
      </g>
      <!-- Tag 3 -->
      <g transform="translate(475, 0)">
        <rect width="220" height="42" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="20" y="26" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">🌐 Web &amp; Mobile Apps</text>
      </g>
      <!-- Tag 4 -->
      <g transform="translate(710, 0)">
        <rect width="230" height="42" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="20" y="26" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">💎 Bespoke Architecture</text>
      </g>
    </g>

    <!-- Footer URL -->
    <g transform="translate(80, 520)">
      <text x="0" y="16" fill="#737373" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="500">Official Portal:</text>
      <text x="110" y="16" fill="#FF5722" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700">https://apexoriontech.com</text>
      <text x="340" y="16" fill="#525252" font-family="system-ui, -apple-system, sans-serif" font-size="14">|</text>
      <text x="360" y="16" fill="#a3a3a3" font-family="system-ui, -apple-system, sans-serif" font-size="14">Global Deployment (USA, UK, UAE, PK, EU)</text>
    </g>
  </svg>
  `;

  const ogComposite = await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: logoBuf,
        top: 90,
        left: 880,
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogComposite);

  // 6. Create site.webmanifest
  console.log('Writing site.webmanifest...');
  const manifest = {
    name: "ApexOrion Tech - Custom Software & Web Agency",
    short_name: "ApexOrion",
    description: "Enterprise software engineering agency delivering high-performance web applications, mobile apps, SaaS, and custom POS systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#FF5722",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('--- ALL BRAND ASSETS SUCCESSFULLY GENERATED ---');
}

generateBrandAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
