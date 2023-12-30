const fs = require('node:fs/promises');

const filePath = '/Users/cgrigori/source/repos/aoc_2023/day_1/1_1_puzzle_input.txt';

async function readFileFrom(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    return data.toString().split('\r\n');
  } catch (err) {
    console.log(err);
  }
}

async function solve() {
    let input = await readFileFrom(filePath);

    let sum = 0;
    
    input.forEach(line => {
        let digits = line.match(/\d/g);
        let first = digits[0];
        let second = digits.slice(-1);
        let number = +(first + second);

        sum += number;
    })

    console.log(sum);
}

solve();