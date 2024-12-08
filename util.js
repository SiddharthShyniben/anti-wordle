export const $ = (...args) => document.querySelector(...args);
export const $$ = (...args) => document.querySelectorAll(...args);

export const wordList = (await fetch("./words.txt").then(response => response.text())).split("\n")

export const snack = (text, long) => new Promise((resolve) => {
  const snackbar = $('#snackbar');
  snackbar.className = '';
  snackbar.innerHTML = text;
  snackbar.classList.add('show');

  setTimeout(() => {
    snackbar.classList.add('hide');
    setTimeout(() => {
      snackbar.className = '';
      resolve();
    }, 500);
  }, long ? 10000 : 3000);
});

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function compareGuess(guess, color, answer) {
  const matched = [];
  const len = guess.length;

  for (let i = 0; i < len; i++) {
    if (answer[i] === guess[i]) {
      if (color[i] !== 'g') {
        return false;
      }

      matched.push(i);
    } else {
      if (color[i] === 'g') {
        return false;
      }

      if (color[i] === 'y') {
        const indexes = getAllIndexes(answer, guess[i])
        const filtered = indexes.filter(index => !matched.includes(index))

        if (filtered.length === 0) {
          return false;
        }

        const first = filtered[0];
        matched.push(first);
      }

      if (color[i] === 'b') {
        const allOccurances = getAllIndexes(answer, guess[i]);
        const filtered = allOccurances.filter(index => !matched.includes(index));

        if (filtered.length > 0) {
          if (!(guess[filtered[0]] === answer[filtered[0]])) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

export function getAllIndexes(arr, val) {
  arr = [...arr]
  const indexes = [];
  for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

