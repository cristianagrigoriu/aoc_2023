import { readFileFrom } from '../helpers/fileHelper.js';

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

function getGamesWithRevealsFrom(input) {
    const games = [];
    input.forEach(game => {
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

function getPowerOfMinimumSetFrom(gamesWithReveals) {
    const maxPerColourPerReveal = gamesWithReveals.reduce((maxPerColour, reveal) => {
        const colours = Object.keys(reveal);
        
        colours.map(colour => {
            maxPerColour[colour] = maxPerColour[colour] === undefined 
            ? (+reveal[colour])
            : Math.max(maxPerColour[colour], +reveal[colour]);
        });
        return maxPerColour;
    }, []);

    return maxPerColourPerReveal['red'] * maxPerColourPerReveal['green'] * maxPerColourPerReveal['blue'];
}

function gameIsPossible(game) {
    return (game['red'] === undefined || game['red'] <= MAX_RED_CUBES)
        && (game['green'] === undefined || game['green'] <= MAX_GREEN_CUBES)
        && (game['blue'] === undefined || game['blue'] <= MAX_BLUE_CUBES); 
}

function getSumOfGamesPossible(gamesPerColour) {
    return gamesPerColour.reduce((accumulator, currentValue, currentIndex) => {
        const gamePossible = currentValue.every(reveal => {
            if (!gameIsPossible(reveal)){
                return false;
            }
            return true;
        });
        if (gamePossible) {
            return accumulator + currentIndex + 1;
        }
        return accumulator; 
    }, 0);
}

function getSumOfPowerOfMinimumSets(gamesPerColour) {
    return gamesPerColour.reduce((accumulator, currentValue) => {
        const power = getPowerOfMinimumSetFrom(currentValue);
        return accumulator + power; 
    }, 0);
}

async function solve() {
    const input = await readFileFrom('2_puzzle_input.txt');

    const gamesWithReveals = getGamesWithRevealsFrom(input);
    const sumOfGamesPossible = getSumOfGamesPossible(gamesWithReveals);
    const sumOfPowerOfMinimumSets = getSumOfPowerOfMinimumSets(gamesWithReveals);

    console.log(sumOfGamesPossible); //2795
    console.log(sumOfPowerOfMinimumSets); //75561
}

solve();