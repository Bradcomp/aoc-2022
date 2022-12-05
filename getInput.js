const fs = require('fs');
const getInput = (f) => {
  const buf = fs.readFileSync(f);
  const arr = buf.toString().split('\n').filter(Boolean);

  return arr;
};
module.exports = getInput;
