const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

/* 
                                    * IMPORTANT *
  - FOR THIS TO WORK, YOU NEED TO MAKE SURE YOU HAVE THESE FONTS INSTALLED ON YOUR PC -
  Search for the word Font in the windows search bar and you will see "Font settings"
  Drag the fonts you want to install inside the box that says "Drag and drop to install"
                      Look at LOOKATME.png for more information
*/

const createPngFromText = async (text, fontPath, outputPath, options = {}) => {
  const {
    fontSize = 48,
    width = 800,
    height = 200,
    backgroundColor = 'white',
    textColor = 'black',
    textAlign = 'center',
    textBaseline = 'middle',
  } = options;

  const fontName = path.basename(fontPath, '.ttf');
  registerFont(fontPath, { family: fontName });

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = textColor;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = `${fontSize}px "${fontName}"`;

  ctx.fillText(text, width / 2, height / 2);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
};

const text = 'Mxgazine';
const fontPath = './fonts/DeadwaxDemoExtreme-X3DlZ.ttf';
const outputPath = 'output/text.png';

createPngFromText(text, fontPath, outputPath, {
    fontSize: 72,
    width: 800,
    height: 400,
    backgroundColor: 'black',
    textColor: 'white',
    textAlign: 'center',
    textBaseline: 'middle',
  }).then(() => {
    console.log('PNG file created successfully!');
  }).catch(err => {
    console.error('Error creating PNG file:', err);
});