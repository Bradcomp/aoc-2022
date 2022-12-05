const getInput = require('./getInput');
const f = './input5.txt';

const input = getInput(f);
const stacks = [
  ['Z', 'T', 'F', 'R', 'W', 'J', 'G'],
  ['G', 'W', 'M'],
  ['J', 'N', 'H', 'G'],
  ['J', 'R', 'C', 'N', 'W'],
  ['W', 'F', 'S', 'B', 'G', 'Q', 'V', 'M'],
  ['S', 'R', 'T', 'D', 'V', 'W', 'C'],
  ['H', 'B', 'N', 'C', 'D', 'Z', 'G', 'V'],
  ['S', 'J', 'N', 'M', 'G', 'C'],
  ['G', 'P', 'N', 'W', 'C', 'J', 'D', 'L']
];

const parseLine = (l) => {
  const [qty, from, to] = l.match(/[0-9]+/g).map(n => parseInt(n));
  return {qty, from: from - 1, to: to - 1};
};

const part1 = () => {
  input.map(parseLine).forEach(({qty, from, to}) => {
    for (let i = 0; i < qty; i++) {
      stacks[to].push(stacks[from].pop());
    }
  });
  console.log(stacks);
};

const part2 = () => {
  input.map(parseLine).forEach(({qty, from, to}) => {
    let tmp = [];
    for (let i = 0; i < qty; i++) {
      tmp.push(stacks[from].pop());
    }
    for (let i = 0; i < qty; i++) {
      stacks[to].push(tmp.pop());
    }
  });
  console.log(stacks);
};

part2();
