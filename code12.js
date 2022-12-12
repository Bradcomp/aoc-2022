const getInput = require('./getInput');
const f = 'input12.txt';
const S = [20, 0];
const E = [20, 120];

const input = getInput(f).map(l => l.split(''));

const getElevation = ([x, y]) => {
  try {
  return input[x][y];
  } catch (e) {
    console.log(x, y);
    throw e;
  }
};

const isInBounds = ([x, y]) => x >= 0 && y >= 0 && x < input.length && y < input[0].length;

const heightOk = (src, dest) => 
  dest.replace('E', 'z').charCodeAt(0) - src.replace('S', 'a').charCodeAt(0) <= 1;

const getNextCandidates = ([x, y], visited) => {
  const currentEl = getElevation([x, y]);
  return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter((coord) => {
    const dupe = visited.has(coord.join(','));
    return isInBounds(coord) && heightOk(currentEl, getElevation(coord)) && !dupe;
  });
}; 
const part1 = () => {
  const myLocation = {loc: S.slice(), step: 0};
  const visited = new Set();
  visited.add(myLocation.loc.join(','));
  const next = getNextCandidates(myLocation.loc, visited).map(loc => ({loc, step: 1}));
  while(next.length) {
    const candidate = next.shift();
    if (getElevation(candidate.loc) === 'E') {
      console.log(candidate);
      break;
    }
    if (visited.has(candidate.loc.join(','))) continue;
    visited.add(candidate.loc.join(','));
    const candidates = getNextCandidates(candidate.loc, visited).map(loc => ({loc, step: candidate.step + 1}));
    for (let c of candidates) next.push(c);
  }
};

part1();

const heightOk2 = (src, dest) => 
  src.replace('E', 'z').charCodeAt(0) - dest.replace('S', 'a').charCodeAt(0) <= 1;

const getNextCandidates2 = ([x, y], visited) => {
  const currentEl = getElevation([x, y]);
  return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter((coord) => {
    const dupe = visited.has(coord.join(','));
    return isInBounds(coord) && heightOk2(currentEl, getElevation(coord)) && !dupe;
  });
}; 
const part2 = () => {

  const myLocation = {loc: E.slice(), step: 0};
  const visited = new Set();
  visited.add(myLocation.loc.join(','));
  const next = getNextCandidates2(myLocation.loc, visited).map(loc => ({loc, step: 1}));
  while(next.length) {
    const candidate = next.shift();
    if (getElevation(candidate.loc) === 'a' || getElevation(candidate.loc) === 'S') {
      console.log(candidate);
      break;
    }
    if (visited.has(candidate.loc.join(','))) continue;
    visited.add(candidate.loc.join(','));
    const candidates = getNextCandidates2(candidate.loc, visited).map(loc => ({loc, step: candidate.step + 1}));
    for (let c of candidates) next.push(c);
  }

}
part2();
