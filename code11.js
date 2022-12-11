const input = require('./input11');
// sample input
/*
{  
  items: [91, 54, 70, 61, 64, 64, 60, 85],
  op: (old) => old * 13,
  test: x => (x % 2) ? 2 : 5,
  inspected: 0,
  totalMod: 2 * 13 * 5 * 3 * 11 * 17 * 7 * 19 
}
  */

const takeTurn1 = (index) => {
  const monkey = input[index];
  const items = monkey.items;
  monkey.inspected = items.length + monkey.inspected;
  while (items.length) {
    const item = items.shift();
    const worry = Math.floor(monkey.op(item) / 3);

    const nextMonkey = monkey.test(worry);
    input[nextMonkey].items.push(worry);
  }
}
const takeRound = (turn) => {
  for (let i = 0; i < input.length; i++) {
    turn(i);
  }
}
const run = (n, takeTurn) => {
  for (let round = 0; round < n; round++) takeRound(takeTurn);
  
  console.log(input.map(i => i.inspected));
};

const part1 = () => run(20, takeTurn1);

//Leave this commented so the monkeys start fresh
//part1();

const takeTurn2 = (index) => {
  const monkey = input[index];
  const items = monkey.items;
  monkey.inspected = items.length + monkey.inspected;
  while (items.length) {
    const item = items.shift();
    let worry = Math.floor(monkey.op(item));
    //totalMod is the product of all the test numbers
    worry = worry % monkey.totalMod;

    const nextMonkey = monkey.test(worry);
    input[nextMonkey].items.push(worry);
  }
};
const part2 = () => run(10000, takeTurn2);
part2();
