const sharp = require('sharp');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'logo_transparent.png');
const outputFile = path.join(__dirname, 'public', 'logo_transparent_trimmed.png');

sharp(inputFile)
  .trim() // Trims away transparent pixels
  .toFile(outputFile)
  .then(info => {
    console.log('Trimmed successfully:', info);
  })
  .catch(err => {
    console.error('Error trimming image:', err);
  });
