const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogos() {
  console.log('Processing LOGONEW.jpeg...');
  // 1. Process LOGONEW.jpeg
  // Background is black (R,G,B < 25). Foreground has White (R,G,B > 180) and Orange (R > 160, G < 140).
  const logoRaw = await sharp('LOGONEW.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width: lW, height: lH, channels: lC } = logoRaw.info;
  const lData = logoRaw.data;

  // Find tight bounds of non-black pixels
  let lMinX = lW, lMaxX = 0, lMinY = lH, lMaxY = 0;
  for (let y = 0; y < lH; y++) {
    for (let x = 0; x < lW; x++) {
      const idx = (y * lW + x) * lC;
      const r = lData[idx], g = lData[idx + 1], b = lData[idx + 2];
      const maxVal = Math.max(r, g, b);
      if (maxVal > 25) {
        if (x < lMinX) lMinX = x;
        if (x > lMaxX) lMaxX = x;
        if (y < lMinY) lMinY = y;
        if (y > lMaxY) lMaxY = y;
      }
    }
  }

  // Add 10px padding around tight bounds
  const lPad = 12;
  const cropX = Math.max(0, lMinX - lPad);
  const cropY = Math.max(0, lMinY - lPad);
  const cropW = Math.min(lW - cropX, (lMaxX - lMinX + 1) + lPad * 2);
  const cropH = Math.min(lH - cropY, (lMaxY - lMinY + 1) + lPad * 2);

  // Create transparent RGBA buffer for LOGONEW
  const outLogoBuf = Buffer.alloc(cropW * cropH * 4);

  for (let dy = 0; dy < cropH; dy++) {
    const sy = cropY + dy;
    for (let dx = 0; dx < cropW; dx++) {
      const sx = cropX + dx;
      const sIdx = (sy * lW + sx) * lC;
      const dIdx = (dy * cropW + dx) * 4;

      const r = lData[sIdx], g = lData[sIdx + 1], b = lData[sIdx + 2];
      const maxVal = Math.max(r, g, b);

      if (maxVal <= 10) {
        // Pure black background -> transparent
        outLogoBuf[dIdx] = 0;
        outLogoBuf[dIdx + 1] = 0;
        outLogoBuf[dIdx + 2] = 0;
        outLogoBuf[dIdx + 3] = 0;
      } else if (maxVal < 45) {
        // Anti-aliased transition from black to foreground
        // Scale alpha smoothly
        const alpha = Math.round(((maxVal - 10) / 35) * 255);
        // Un-premultiply color against black:
        const scale = 255 / maxVal;
        outLogoBuf[dIdx] = Math.min(255, Math.round(r * scale));
        outLogoBuf[dIdx + 1] = Math.min(255, Math.round(g * scale));
        outLogoBuf[dIdx + 2] = Math.min(255, Math.round(b * scale));
        outLogoBuf[dIdx + 3] = alpha;
      } else {
        // Solid foreground
        outLogoBuf[dIdx] = r;
        outLogoBuf[dIdx + 1] = g;
        outLogoBuf[dIdx + 2] = b;
        outLogoBuf[dIdx + 3] = 255;
      }
    }
  }

  await sharp(outLogoBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('public/logo_transparent.png');
  console.log(`Saved public/logo_transparent.png (${cropW}x${cropH})`);

  // Also create a root copy for safety if needed
  await sharp(outLogoBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('logo_transparent.png');

  // Create square tab_logo.png (favicon / app icon)
  // For favicon, let's extract the emblem or center crop with square aspect ratio
  const squareSize = Math.max(cropW, cropH) + 40;
  await sharp('public/logo_transparent.png')
    .resize(squareSize, squareSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/tab_logo.png');
  console.log('Saved public/tab_logo.png');

  // Favicon 32x32 and 192x192
  await sharp('public/tab_logo.png').resize(32, 32).png().toFile('public/favicon-32x32.png');
  await sharp('public/tab_logo.png').resize(192, 192).png().toFile('public/logo192.png');
  await sharp('public/tab_logo.png').resize(512, 512).png().toFile('public/logo512.png');
  await sharp('public/tab_logo.png').resize(180, 180).png().toFile('public/apple-touch-icon.png');

  // ----------------------------------------------------
  // 2. Process new nav.jpeg
  // ----------------------------------------------------
  console.log('\nProcessing new nav.jpeg...');
  const navRaw = await sharp('new nav.jpeg').raw().toBuffer({ resolveWithObject: true });
  const { width: nW, height: nH, channels: nC } = navRaw.info;
  const nData = navRaw.data;

  // Find tight bounds of non-white pixels
  let nMinX = nW, nMaxX = 0, nMinY = nH, nMaxY = 0;
  for (let y = 0; y < nH; y++) {
    for (let x = 0; x < nW; x++) {
      const idx = (y * nW + x) * nC;
      const r = nData[idx], g = nData[idx + 1], b = nData[idx + 2];
      // Background is near white (R,G,B > 240)
      if (r < 235 || g < 235 || b < 235) {
        if (x < nMinX) nMinX = x;
        if (x > nMaxX) nMaxX = x;
        if (y < nMinY) nMinY = y;
        if (y > nMaxY) nMaxY = y;
      }
    }
  }

  const nPad = 8;
  const nCropX = Math.max(0, nMinX - nPad);
  const nCropY = Math.max(0, nMinY - nPad);
  const nCropW = Math.min(nW - nCropX, (nMaxX - nMinX + 1) + nPad * 2);
  const nCropH = Math.min(nH - nCropY, (nMaxY - nMinY + 1) + nPad * 2);

  // We want TWO outputs for new nav:
  // (A) Dark Theme Version: White text + preserved vibrant orange, on 100% transparent background.
  // (B) Light Theme Version (optional): Navy text + preserved vibrant orange, on 100% transparent background.
  const outNavDarkTheme = Buffer.alloc(nCropW * nCropH * 4);
  const outNavLightTheme = Buffer.alloc(nCropW * nCropH * 4);

  for (let dy = 0; dy < nCropH; dy++) {
    const sy = nCropY + dy;
    for (let dx = 0; dx < nCropW; dx++) {
      const sx = nCropX + dx;
      const sIdx = (sy * nW + sx) * nC;
      const dIdx = (dy * nCropW + dx) * 4;

      const r = nData[sIdx], g = nData[sIdx + 1], b = nData[sIdx + 2];

      // White background detection:
      // White bg is ~250-255 in all channels
      const minVal = Math.min(r, g, b);
      const isOrange = (r > 160 && (r - g) > 50 && (r - b) > 80);

      if (minVal >= 250 && !isOrange) {
        // Pure white background -> transparent
        outNavDarkTheme[dIdx] = 0;
        outNavDarkTheme[dIdx + 1] = 0;
        outNavDarkTheme[dIdx + 2] = 0;
        outNavDarkTheme[dIdx + 3] = 0;

        outNavLightTheme[dIdx] = 0;
        outNavLightTheme[dIdx + 1] = 0;
        outNavLightTheme[dIdx + 2] = 0;
        outNavLightTheme[dIdx + 3] = 0;
      } else if (isOrange) {
        // Vibrant Orange accent:
        // Calculate transparency against white background
        // In white background: White (255,255,255) vs Orange (245, 95, 15)
        // Darkness in G & B indicates orange opacity
        const gbDarkness = (255 - g) / 160; // 0 when g=255, 1 when g=95
        const alpha = Math.min(255, Math.max(0, Math.round(gbDarkness * 255)));

        outNavDarkTheme[dIdx] = r;
        outNavDarkTheme[dIdx + 1] = g;
        outNavDarkTheme[dIdx + 2] = b;
        outNavDarkTheme[dIdx + 3] = Math.max(alpha, 180);

        outNavLightTheme[dIdx] = r;
        outNavLightTheme[dIdx + 1] = g;
        outNavLightTheme[dIdx + 2] = b;
        outNavLightTheme[dIdx + 3] = Math.max(alpha, 180);
      } else {
        // Navy / dark gray text & emblem:
        // Navy is ~[4, 18, 41] on white [254, 254, 254]
        // Darkness from white (255 - brightness)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        const darkness = (255 - brightness) / 255; // 0 for pure white, ~0.95 for navy

        if (darkness < 0.08) {
          // essentially white background
          outNavDarkTheme[dIdx] = 0;
          outNavDarkTheme[dIdx + 1] = 0;
          outNavDarkTheme[dIdx + 2] = 0;
          outNavDarkTheme[dIdx + 3] = 0;

          outNavLightTheme[dIdx] = 0;
          outNavLightTheme[dIdx + 1] = 0;
          outNavLightTheme[dIdx + 2] = 0;
          outNavLightTheme[dIdx + 3] = 0;
        } else {
          // Smooth alpha ramp
          const alpha = Math.min(255, Math.round((darkness / 0.85) * 255));

          // For DARK THEME (Website navbar is dark/black):
          // Convert navy to pure crisp white #FFFFFF (with slight cool silver tint 250, 252, 255)
          outNavDarkTheme[dIdx] = 252;
          outNavDarkTheme[dIdx + 1] = 253;
          outNavDarkTheme[dIdx + 2] = 255;
          outNavDarkTheme[dIdx + 3] = alpha;

          // For LIGHT THEME:
          outNavLightTheme[dIdx] = r;
          outNavLightTheme[dIdx + 1] = g;
          outNavLightTheme[dIdx + 2] = b;
          outNavLightTheme[dIdx + 3] = alpha;
        }
      }
    }
  }

  await sharp(outNavDarkTheme, { raw: { width: nCropW, height: nCropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('public/nav_logo_transparent.png');
  console.log(`Saved public/nav_logo_transparent.png (${nCropW}x${nCropH}) - optimized for Dark theme`);

  await sharp(outNavLightTheme, { raw: { width: nCropW, height: nCropH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('public/nav_logo_light_bg.png');
  console.log(`Saved public/nav_logo_light_bg.png (${nCropW}x${nCropH})`);
}

processLogos().catch(console.error);
