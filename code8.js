const getInput = require('./getInput');
const f = './input8.txt';

const input = getInput(f).map(x => x.split('').map(y => parseInt(y)));

console.log(input[0]);

const isVisible = (x, y) => {
  const maxDim = input.length - 1;
  const height = input[x][y];
  if (x === 0 || y === 0 || x === maxDim || y === maxDim) return true;
  let above = below = left = right = true;
  for (let i = 0; i < x; i++) {
    if (input[i][y] >= height) { left = false; break; }
  }
  if (left) return true;
  for (let i = x + 1; i < input.length; i++) {
    if (input[i][y] >= height) { right = false; break; }
  }
  if (right) return true;
  for (let i = 0; i < y; i++) {
    if (input[x][i] >= height) { above = false; break; }
  }
  if (above) return true;
  for (let i = y + 1; i < input.length; i++) {
    if (input[x][i] >= height) { below = false; break; }
  }
  if (below) return true;

  return false;
}
const part1 = () => {
  let visibleCount = 0;
  for (let i = 0; i < input.length; i++) {

    for (let j = 0; j < input.length; j++) {
      if (isVisible(i, j)) visibleCount++;
    }
  }
  console.log(visibleCount);
};
part1();

const scenicScore = (x, y) => {
  let left = right = above = below = 0;
  let height = input[x][y];
  for (let i = x - 1; i >= 0; i--) {
    left++;
    if (input[i][y] >= height) break;
  }
  for (let i = x + 1; i < input.length; i++) {
    right++;
    if (input[i][y] >= height) break;
  }
  for (let i = y - 1; i >= 0; i--) {
    above++;
    if (input[x][i] >= height) break;
  }
  for (let i = y + 1; i < input.length; i++) {
    below++;
    if (input[x][i] >= height) break;
  }
  return left * right * above * below;
}; 

const part2 = () => {
  let maxScenicScore = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const score = scenicScore(i, j);
      if (score > maxScenicScore) maxScenicScore = score;
    }
  }
  console.log(maxScenicScore);
};
part2();
