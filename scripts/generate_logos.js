const fs = require('fs');
const path = require('path');

const clients = [
    { name: 'HCL', file: 'hcl.png', color: '#1a76b9' },
    { name: 'AkzoNobel', file: 'akzonobel.png', color: '#004b87' },
    { name: 'Cameron', file: 'cameron.png', color: '#002f6c' },
    { name: 'Taghleef', file: 'taghleef.png', color: '#008c44' },
    { name: 'Al Rusayl', file: 'madayn-rusayl.png', color: '#8b6f47' },
    { name: 'Nafith', file: 'nafith.png', color: '#005596' },
    { name: 'National Detergent', file: 'nat-detergent.png', color: '#e31e24' },
    { name: 'Pragati', file: 'pragati.png', color: '#f37021' },
    { name: 'IIA', file: 'iia.png', color: '#58595b' },
    { name: 'ASAAS', file: 'asaas.png', color: '#8b6f47' },
    { name: 'Vodafone', file: 'vodafone.png', color: '#e60000' },
    { name: 'MTCIT', file: 'mtcit.png', color: '#8b6f47' },
    { name: 'MOE', file: 'moe.png', color: '#8b6f47' },
    { name: 'Hydro', file: 'hydro.png', color: '#00a9ce' },
    { name: 'Areej', file: 'areej.png', color: '#8b6f47' },
    { name: 'Oman Packaging', file: 'oman-packaging.png', color: '#006241' },
    { name: 'Oman REIT', file: 'oman-reit.png', color: '#8b6f47' },
    { name: 'Madayn', file: 'madayn.png', color: '#8b6f47' },
    { name: 'Port of Duqm', file: 'duqm.png', color: '#003366' },
    { name: 'MAFWR', file: 'mafwr.png', color: '#8b6f47' },
    { name: 'ROP', file: 'rop.png', color: '#8b6f47' },
    { name: 'Schlumberger', file: 'schlumberger.png', color: '#002f6c' },
    { name: 'Asyad', file: 'asyad.png', color: '#d4af37' },
    { name: 'Savills', file: 'savills.png', color: '#fbf305' },
    { name: 'Oman Cables', file: 'oman-cables.png', color: '#d4af37' },
    { name: 'Emdad', file: 'emdad.png', color: '#005596' },
    { name: 'Shumookh', file: 'shumookh.png', color: '#8b6f47' },
    { name: 'NCSI', file: 'ncsi.png', color: '#8b6f47' },
    { name: 'Diwan', file: 'diwan.png', color: '#8b6f47' },
    { name: 'Mubadrah', file: 'mubadrah.png', color: '#8b6f47' }
];

const dir = 'public/clients';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

clients.forEach(client => {
    // Creating a simple SVG with text
    const svgContent = `
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${client.color}">${client.name}</text>
</svg>`;

    // Note: We are saving as .png, but the content is SVG. Next.js image might complain, but browsers often handle it.
    // Better to actually use a library to convert, or just save as .svg and update the component.
    // Let's modify the component to look for SVGs if PNGs fail, OR just save simple PNGs.
    // Since I can't easily generate binary PNGs with just node standard lib, I will save them as .svg

    const filePath = path.join(dir, client.file.replace('.png', '.svg'));
    fs.writeFileSync(filePath, svgContent);
    console.log(`Generated ${filePath}`);
});
