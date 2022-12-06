const input = require('./input6');

const findMarker = (input) => {
  for (let i = 0; i < input.length; i++) {
    const chars = new Set([input[i], input[i + 1], input[i + 2], input[i + 3]]);
    if (chars.size === 4) return i + 4;
  }
}

console.log(findMarker(input));

const findMessage = (input) => {
  for (let i = 1620; i < input.length; i++) {
    const chars = new Set();
    for (let j = 0; j < 14; j++) {
      chars.add(input[i + j]);
    }
    if (chars.size === 14) return i + 14;
  }
}
console.log(findMessage(input))
