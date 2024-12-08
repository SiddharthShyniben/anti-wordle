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

  let max2 = -Infinity;
  let maxPerm2, maxMatches2;

  for (let perm of p) {
    const matches = findMatchingWords(guess, perm, possible);

    if (matches.length === 0) continue;

    if (matches.length > max) {
      max = matches.length;
      maxPerm = perm;
      maxMatches = matches;
    } else if (matches.length > max2) {
      max2 = matches.length;
      maxPerm2 = perm;
      maxMatches2 = matches;
    }
  }

  if (Math.random() > 0.5) {
    max = max2
    maxMatches = maxMatches2
    maxPerm = maxPerm2
  }

  console.log(possible.join(", "))

  possible = maxMatches;
  return maxPerm;
}

export const getAnswer = () => possible[0];
