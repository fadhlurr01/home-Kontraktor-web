const fs = require('fs');
const path = require('path');

const templates = [
  { id: 'karyabuild', url: 'https://karya-build-cl1i.vercel.app/' },
  { id: 'kontraktorpro', url: 'https://kontraktorpro-beta.vercel.app/' },
  { id: 'binakarya', url: 'https://binakarya-jet.vercel.app/' },
  { id: 'nusantrakontruksi', url: 'https://nusantrakontruksi.vercel.app/' },
  { id: 'nusantarakarya', url: 'https://nusantara-karya.vercel.app/' },
  { id: 'nkontruksi', url: 'https://nkontruksi.vercel.app/' },
  { id: 'nusantarakokoh', url: 'https://nusantara-kokoh.vercel.app/' },
  { id: 'nusakarya', url: 'https://nusakarya-psi.vercel.app/' },
  { id: 'nusara', url: 'https://nusara-umber.vercel.app/' },
  { id: 'karyautama', url: 'https://karya-utama-dusky.vercel.app/' },
  { id: 'nusakon', url: 'https://nusakon.vercel.app/' },
  { id: 'nunsabuild', url: 'https://nunsabuild.vercel.app/' },
  { id: 'karyaprima', url: 'https://karya-prima.vercel.app/' },
  { id: 'nusaka', url: 'https://nusaka-chi.vercel.app/' },
  { id: 'kontraksuid', url: 'https://kontraksu-id.vercel.app/' }
];

const outDir = path.join(__dirname, '../public/templates');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  for (const tpl of templates) {
    const filePath = path.join(outDir, `${tpl.id}.png`);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 10000) {
      console.log(`[SKIP] ${tpl.id} already exists`);
      continue;
    }

    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(tpl.url)}&screenshot=true&meta=false&embed=screenshot.url`;
    console.log(`[DOWNLOADING] ${tpl.id} from ${tpl.url}...`);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        console.warn(`[FAILED] ${tpl.id}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`[SUCCESS] Saved ${tpl.id}.png (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`[ERROR] ${tpl.id}:`, err.message);
    }
  }
}

downloadAll();
