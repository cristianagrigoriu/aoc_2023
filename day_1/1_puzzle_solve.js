import { readFileFrom } from '../helpers/fileHelper.js';
import { fileURLToPath } from 'url';
import path from 'path';

//ToDo move all inputs to the same folder
//ToDo read about default export
function getFilePath(fileName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, fileName);
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
    const input = await readFileFrom(getFilePath('1_puzzle_input.txt'));

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