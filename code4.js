const getInput = require('./getInput');
const f = './input4.txt';

const input = getInput(f);

const fullyContains = ({l1, h1, l2, h2}) => (l1 <= l2 && h1 >= h2) || (l2 <= l1 && h2 >= h1);
const overlaps = ({l1, h1, l2, h2}) => (l1 <= h2 && h1 >= l2) && (l2 <= h1 && h2 >= l2);

const parseLine = (l) => {
  const [left, right] = l.split(',');
  const [l1, h1] = left.split('-').map(n => parseInt(n));
  const [l2, h2] = right.split('-').map(n => parseInt(n));

  return {l1, h1, l2, h2};
};

const part1 = () => input.map(parseLine).filter(fullyContains).length;

console.log(part1());

const part2 = () => input.map(parseLine).filter(overlaps).length;

console.log(part2());
