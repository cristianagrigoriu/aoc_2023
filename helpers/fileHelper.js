import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

async function readFileFrom(filePath) {
    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        return data.toString().split('\r\n');
    } catch (err) {
        console.log(err);
    }
};

function getFilePath(fileName) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, fileName);
  }

export {
    readFileFrom
};