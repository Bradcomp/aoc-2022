const fs = require('fs');
const getInput = () => {
  const buf = fs.readFileSync('./input1.txt');
  const arr = buf.toString().split('\n');

  return arr;
};

const part1 = () => {
  const input = getInput();
  const {max} = input.reduce(({max, current}, val) => {
    if (val.length) {
      const v = parseInt(val);
      return {max, current: current + v};
    } 
    const m = current > max ? current : max;
    return {max: m, current: 0};
  }, {max: 0, current: 0});
  console.log(max);
};

const removeMin = arr => {
  let min = Infinity, minIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      minIndex = i;
    }
  }
  arr.splice(minIndex, 1);
  return arr;
}
const part2 = () => {
  const input = getInput();
  const {sums} = input.reduce(({sums, current}, val) => {
    if (val.length) {
      const v = parseInt(val);
      return {sums, current: current + v};
    } 
    if (sums.length < 3) {
      sums.push(current);
    }
    
    if (current > sums[0] || current > sums[1] || current > sums[2]) {
      removeMin(sums);
      sums.push(current);
    }
    return {sums, current: 0};
  }, {current: 0, sums: []});
  console.log(sums[0] + sums[1] + sums[2]);

}

part2();
