import { readFileFrom } from '../helpers/fileHelper.js';

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

function getGamesWithRevealsFrom(input) {
    const games = [];
    input.forEach(game => {
        const gameId = game.split(':')[0].split(' ')[1]; //?
        const revealsInput = game.split(':')[1].split(';');
        const reveals = [];
        revealsInput.forEach(reveal => {
            const drawsInput = reveal.trim().split(',');
            const draws = {};
            drawsInput.forEach(drawInput => {
                const [count, colour] = drawInput.trim().split(' ');
                draws[colour] = count;
            });
            reveals.push(draws);
        });
        games.push(reveals);
    });
    return games;
}

function getGamesWithToTalNumberOfCubesFrom(gamesWithReveals) {
    const games = [];
    return gamesWithReveals.map(reveals => {
        const drawsPerColour = [];
        reveals.map(reveal => {
            const colours = Object.keys(reveal);
            
            colours.map(colour => {
                drawsPerColour[colour] = drawsPerColour[colour] === undefined 
                ? (+reveal[colour])
                : drawsPerColour[colour] + (+reveal[colour]);
            });
        })
        return drawsPerColour;
    });
}

function gameIsPossible(game) {
    return (game['red'] === undefined || game['red'] <= MAX_RED_CUBES)
        && (game['green'] === undefined || game['green'] <= MAX_GREEN_CUBES)
        && (game['blue'] === undefined || game['blue'] <= MAX_BLUE_CUBES); 
}

function getSumOfGamesPossible(gamesPerColour) {
    return gamesPerColour.reduce((accumulator, currentValue, currentIndex) => {
        if (gameIsPossible(currentValue)){
            return accumulator + currentIndex + 1;
        }
        return accumulator;
    }, 0);
}

async function solve() {
    const input = await readFileFrom('2_puzzle_input.txt');

    const gamesWithReveals = getGamesWithRevealsFrom(input);
    const gamesPerColour = getGamesWithToTalNumberOfCubesFrom(gamesWithReveals);
    const sumOfGamesPossible = getSumOfGamesPossible(gamesPerColour);

    console.log(sumOfGamesPossible); //426 - too low
}

solve();