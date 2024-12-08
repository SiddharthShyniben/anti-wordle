import { checkGuess, getAnswer } from "./guess.js";
import { $, $$, sleep, snack, wordList } from "./util.js";

const keys = $$('key');

let row = 0;
let gameover = false;

const gotKey = async key => {
  if (gameover) return;
  key = key.toLowerCase();

  if (key.length === 1) {
    const cellToWrite = $('.cell.row-' + row + ':empty');

    if (cellToWrite) {
      cellToWrite.innerHTML = key;
      cellToWrite.classList.add('black');
    }
  } else {
    if (key === 'backspace') {
      const lastFilledCell = [...$$('.cell.row-' + row + ':not(:empty)')].pop();

      lastFilledCell.innerHTML = '';
      lastFilledCell.classList.remove('black');
    } else if (key === 'enter') {
      const filledCells = [...$$('.cell.row-' + row + ':not(:empty)')].slice(-7);

      if (filledCells.length === 5) {
        const guess = filledCells.map(cell => cell.innerHTML).join('');
        if (!wordList.includes(guess)) {
          snack("Invalid guess!");
          return false;
        }

        const res = checkGuess(guess)
        console.log({ res });

        const colorMap = {
          'y': 'yellow',
          'g': 'green',
          'b': 'dim'
        };

        const colors = res
          .split('')
          .map(char => colorMap[char]);

        for (let [i, color] of Object.entries(colors)) {
          $(`[data-key=${guess[i]}`).classList.add(color);
          const cell = filledCells[i];

          cell.classList.remove('black', 'green', 'yellow');
          cell.classList.add(color, 'pop');

          await sleep(200)
          setTimeout(() => {
            cell.classList.remove('pop');
          }, 1350);
        }

        if (row < 5) {
          row++;
        } else {
          gameover = true;
          snack('Oops, you lost :( <strong>The word was ' + getAnswer() + '</strong>', true);
        }
      }
    } else console.log(key);
  }
};

keys.forEach(key => {
  key.addEventListener('click', () => gotKey(key.getAttribute('data-key')));
});

document.addEventListener('keydown', event => {
  if (document.activeElement.tagName === 'BUTTON') return;
  const key = event.key;

  if (key.ctrlKey) return;
  if (!isNaN(+key)) return;

  gotKey(key);
});
