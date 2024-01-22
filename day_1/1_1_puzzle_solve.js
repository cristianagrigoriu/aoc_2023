const fs = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '1_1_puzzle_input.txt');

async function readFileFrom(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    return data.toString().split('\r\n');
  } catch (err) {
    console.log(err);
  }
}

function getStringDigitFrom(digitOrString) {
  if (!isNaN(digitOrString)){
    return digitOrString;
  }

  const stringsToDigits = {
    "one": '1',
    "two": '2',
    "three": '3',
    "four": '4',
    "five": '5',
    "six": '6',
    "seven": '7',
    "eight": '8',
    "nine": '9'
  }

  return stringsToDigits[digitOrString];
}

function getReverse(word) {
  return word.split("").reverse().join("");
}

async function solve() {
    const input = await readFileFrom(filePath);

    const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/i;
    const reverseRegex = /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/i;

    let sum = input.reduce((accumulator, currentValue) => {
      let firstDigit = currentValue.match(regex)[0];

      const reverse = getReverse(currentValue);
      const reverseLastDigit = reverse.match(reverseRegex)[0];
      const lastDigit = getReverse(reverseLastDigit);

      const first = getStringDigitFrom(firstDigit);
      const last = getStringDigitFrom(lastDigit);

      const number = +(first + last);
      return accumulator + number;
    }, 0);

    console.log(sum); //55725, 55701
}

solve();