const fs = require('fs');
const getInput = () => {
  const buf = fs.readFileSync('./input2.txt');
  const arr = buf.toString().split('\n');

  return arr;
};

const getCounts = (input) => {
  return input.reduce((acc, l) => {
    if (!acc[l]) acc[l] = 0;
    acc[l] = acc[l] + 1;
    return acc;
  }, {});
}

const keys = ['A X', 'B X', 'C X',
              'A Y', 'B Y', 'C Y',
              'A Z', 'B Z', 'C Z'];

const getScore = (counts, scoreCounter) => {
  let total = 0;
  keys.forEach(k => {total += scoreCounter(k, counts[k] || 0)});
  console.log(total);
};

const isDraw = (s) => s[0] === s[2];
const part1Counter = (key, count) => {
  let keyScoreString = key.replace(/[AX]/g, '1').replace(/[BY]/g, '2').replace(/[CZ]/g, '3'); 
  const wins = ['1 2', '2 3', '3 1'];
  const myVal = parseInt(keyScoreString[2]);
  let modifier = 0;
  if (wins.includes(keyScoreString)) modifier = 6;
  if (isDraw(keyScoreString)) modifier = 3;
  
  return (myVal + modifier) * count;
}

const part2Counter = (key, count) => {
  const opponent = parseInt(key[0].replace('A', '1').replace('B', '2').replace('C', '3'));
  const isWin = key[2] === 'Z';
  const isDraw = key[2] === 'Y';

  if (isWin) {
    let myVal = (opponent % 3) + 1;
    return (myVal + 6) * count;
  }
  if (isDraw) return (opponent + 3) * count;
  
  return ((opponent - 1) || 3) * count;
}

const run = (counter) => {
  const input = getInput();
  //const input = ['A Y', 'B X', 'C Z'];
  const counts = getCounts(input);
  console.log(counts);
  getScore(counts, counter);
}

run(part1Counter);
run(part2Counter);
