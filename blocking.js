const fs = require('fs/promises');
const path = require('path');
// ─── Sync Version ─────────────────────────────────── 🟩 ─
// const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');

// ─── Async Version ────────────────────────────────── 🟩 ─
const read = async () => {
  const result = fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
  return result;
};
read().then((f) => console.log(f));
console.log('hi');
