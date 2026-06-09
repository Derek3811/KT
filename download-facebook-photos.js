const fs = require('fs');
const path = require('path');
const https = require('https');

const URLS_FILE = path.join(__dirname, 'urls.txt');
const OUTPUT_DIR = path.join(__dirname, 'sample', '001');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(URLS_FILE)) {
  console.log('\n==================================================================');
  console.log('Error: urls.txt not found.');
  console.log('Please create a urls.txt file in this directory and paste the image URLs into it (one per line).');
  console.log('==================================================================\n');
  process.exit(1);
}

const urls = fs.readFileSync(URLS_FILE, 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

console.log(`Found ${urls.length} URLs in urls.txt. Starting download...`);

let successCount = 0;
let failCount = 0;

function downloadImage(url, index) {
  return new Promise((resolve) => {
    const filename = `fb_photo_${String(index).padStart(3, '0')}.jpg`;
    const destPath = path.join(OUTPUT_DIR, filename);
    const file = fs.createWriteStream(destPath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`[Error] Failed to download URL #${index} (Status: ${response.statusCode})`);
        failCount++;
        file.close();
        fs.unlink(destPath, () => {}); // delete partial file
        resolve();
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`[Downloaded] ${filename} successfully.`);
        successCount++;
        resolve();
      });
    }).on('error', (err) => {
      console.error(`[Error] Connection error for URL #${index}:`, err.message);
      failCount++;
      file.close();
      fs.unlink(destPath, () => {});
      resolve();
    });
  });
}

async function run() {
  // Download in batches of 5 to avoid overloading connections
  const batchSize = 5;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize).map((url, index) => {
      const globalIndex = i + index + 1;
      return downloadImage(url, globalIndex);
    });
    await Promise.all(batch);
  }
  console.log('\n--- Download Summary ---');
  console.log(`Total URLs processed: ${urls.length}`);
  console.log(`Successfully downloaded: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`All photos are saved in: ${OUTPUT_DIR}`);
}

run();
