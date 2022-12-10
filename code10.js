const getInput = require('./getInput');
const f = 'input10.txt';

const input = getInput(f);


signal = (cycle, x) => x * cycle;
const part1 = () => {
  let cycle = 1;
  let X = 1;
  let signalStrengths = 0;
  const endCycle = (op) => {
    const cycles = [20, 60, 100, 140, 180, 220];
    if (cycles.includes(cycle)) {
      console.log(signal(cycle, X));
      signalStrengths += signal(cycle, X);
    }
    cycle++;
    X = X + op;
    if (X > 39) console.log('BIGX', X);
    if (X < 1) console.log('SMOX', X);
  };
  // X changes at end of cycle
  // addx takes two cycles
  const addx = (amt) => {
    endCycle(0);
    endCycle(amt);
  };
  const noop  = () => {
    endCycle(0);
  };
  for (let line of input) {
    const [cmd, a] = line.split(' ');
    const amt = parseInt(a);
    if (cmd === 'noop') noop();
    if (cmd === 'addx') addx(amt);
  }
  console.log(signalStrengths);
};

part1();

const sprite = (x, cycle) => {
  cycle = cycle - 1;
  cycle = cycle % 40;
  if (x === cycle || x - 1 === cycle || x + 1 === cycle) return '#';
  return '.';
};
const part2 = () => {
  let cycle = 1;
  let X = 1;
  const endCycle = (op, row) => {
    const s = sprite(X, cycle);
    row.push(s);
    cycle++;
    X = X + op;
  };
  // X changes at end of cycle
  // addx takes two cycles
  const addx = (amt, row) => {
    endCycle(0, row);
    endCycle(amt, row);
  };
  const noop  = (row) => {
    endCycle(0, row);
  };
  let rows = [];
  for (let line of input) {
    if ((cycle - 1) % 40 === 0) {
      rows.push([]);
    }
    let row = rows[rows.length - 1];
    const [cmd, a] = line.split(' ');
    const amt = parseInt(a);
    if (cmd === 'noop') noop(row);
    if (cmd === 'addx') addx(amt, row);
  }
  for (let row of rows) {
    console.log(row.join(''));
  }
};

part2();
