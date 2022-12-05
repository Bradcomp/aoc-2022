const getInput = require('./getInput');
const f = './input3.txt';

const getSharedLetter = (row) => {
  const len = row.length;
  const half = len / 2;
  const left = row.slice(0, half);
  const right = row.slice(half);

  const s = new Set(left.split(''));
  let letter;
  right.split('').forEach(l => {
    if (s.has(l)) letter = l;
  });

  return letter;
};

const getPriority = letter => {
  const charCode = letter.charCodeAt(0);
  if (charCode > 96) return charCode - 96;
  return charCode - 38;
}

const input = getInput(f);

const part1 = () => input.reduce((acc, row) => {
  const l = getSharedLetter(row);
  const p = getPriority(l);
  return acc + p;
}, 0);

console.log(part1());

const part2 = () => {
  let sum = 0, sharedLetter = '';
  for (let i = 0; i < input.length; i += 3) {

    const first = new Set(input[i].split(''));
    const sec = new Set(input[i + 1].split(''));
    const thrd = input[i + 2].split('');
    thrd.forEach(l => {
      if (first.has(l) && sec.has(l)) sharedLetter = l;
    });

    sum += getPriority(sharedLetter);
  }

  console.log(sum);
};

part2();
