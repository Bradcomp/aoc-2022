const getInput = require('./getInput');
const f = './input14.txt';

const source = [500, 0];
const SAND = 'o';
const ROCK = '#';
const input = getInput(f);
const grid = {};

const range = (s, e) => {
  let tmp = s;
  if (s > e) {
    s = e;
    e = tmp;
  }

  let result = [];
  for (let i = s; i <= e; i++) result.push(i);

  return result;
};

const addPoint = (point, c) => grid[point.join(',')] = c;

const offBottom = (point) => point[1] > 200; // The ys are all below 200
const dropSand1 = () => {
  let point = source.slice();

  while (true) {
    if (offBottom(point)) return true;
    let next = [point[0], point[1] + 1]; // right below
    if (grid[next.join(',')]) next[0] = next[0] - 1; // diagonal left
    if (grid[next.join(',')]) next[0] = next[0] + 2; // diagonal right
    if (grid[next.join(',')]) {
      // we need to stop here
      grid[point.join(',')] = SAND;
      return false;
    }

    point = next.slice();
  }
}

const run = (dropSand) => {
  let maxY = 0;
  for (let line of input) {
    const points = line.split(' -> ').map(p => p.split(',').map(i => parseInt(i)));
    //console.log(points);
    for (let i = 1; i < points.length; i++) {
      const start = points[i - 1];
      const end = points[i];
      const index = start[0] === end[0] ? 1 : 0;
      const r = range(start[index], end[index]);

      for (let j of r) {
        const point = index ? [start[0], j] : [j, start[1]];
        addPoint(point, ROCK);
        if (point[1] > maxY) maxY = point[1];
      }
    }
  }
  // I now have a mapping of points to rocks
  // time to drop sand
  let sand = 0;
  while (true) {
    const stop = dropSand(maxY);
    if (stop) break;
    sand++;
  }
  console.log(sand);
};
const part1 = () => run(dropSand1);
//part1();


const dropSand2 = (maxY) => {
  let point = source.slice();

  if (grid[source.join(',')]) return true;
  let bottom = maxY + 2;
  while (true) {
    let next = [point[0], point[1] + 1]; // right below
    if (grid[next.join(',')]) next[0] = next[0] - 1; // diagonal left
    if (grid[next.join(',')]) next[0] = next[0] + 2; // diagonal right
    if (grid[next.join(',')] || next[1] === bottom) {
      // we need to stop here
      grid[point.join(',')] = SAND;
      return false;
    }

    point = next.slice();
  }
}

run(dropSand2);
