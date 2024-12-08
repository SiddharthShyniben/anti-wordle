import { compareGuess, wordList } from "./util.js";

let possible = wordList;

const s = 'byg';
const p = [];

for (let i = 0; i < 3; i++)
  for (let j = 0; j < 3; j++)
    for (let k = 0; k < 3; k++)
      for (let l = 0; l < 3; l++)
        for (let m = 0; m < 3; m++)
          p.push(s[i] + s[j] + s[k] + s[l] + s[m]);

export function findMatchingWords(word, colors, wordList) {
  return wordList.filter(w => compareGuess(word, colors, w));
}

export const checkGuess = guess => {
  let max = -Infinity;
  let maxPerm, maxMatches;

  for (let perm of p) {
    const matches = findMatchingWords(guess, perm, possible);
    if (matches.length > max) {
      max = matches.length;
      maxPerm = perm;
      maxMatches = matches;
    }
  }

  possible = maxMatches;
  return maxPerm;
}

export const getAnswer = () => possible[0];
