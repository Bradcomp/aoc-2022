const getInput = require('./getInput');
const f = './input15.txt';
const input = getInput(f);

const parse = (s) => {
  const arr = s.match(/-?[0-9]+/g).map(x => parseInt(x)); 
  return [[arr[0], arr[1]], [arr[2], arr[3]]];
}
const manhattan = (start, end) => Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);

const covered = new Set();
const beacons = new Set();
const processSensor = (row, sensor, beacon) => {
  const reach = manhattan(sensor, beacon);
  const toRow = Math.abs(row - sensor[1]);
  const inReach = toRow <=reach; 

  const extraCoverage = reach - torow;

  for (let i = sensor[0] - extraCoverage; i <= sensor[0] + extraCoverage; i++ ) {
    if (!beacons.has(`${i},${row}`)) covered.add(`${i},${row}`)
  }
}

const part1 = () => {
  const pairs = input.map(parse);
  pairs.forEach(([sensor, beacon]) => {
    beacons.add(beacon.join(','));
  });

  pairs.forEach(([sensor, beacon]) => {
    processSensor(2000000, sensor, beacon);
  });

  console.log(covered.size);
};

//part1();

const part2 = () => {
  const pairs = input.map(parse);
  pairs.forEach(([sensor, beacon]) => {
    beacons.add(beacon.join(','));
  });
  const check = (sensor, point) => {
    if (point[0] < 0 || point[0] > 4000000 || point[1] < 0 || point[1] > 4000000) return false;
    for (let i = 0; i < pairs.length; i++) {
      const toCheck = pairs[i];
      // Dont check against the sensor you are checking
      if (toCheck[0] === sensor[0] && toCheck[1] === sensor[1]) continue;
      const range = manhattan(toCheck[0], toCheck[1]);

      if (manhattan(toCheck[0], point) <= range) return false;
    }
    return true;
  }
  const processSensor = ([sensor, beacon]) => {
    //Check the area directly outside each sensor's range
    const outOfReach = manhattan(sensor, beacon) + 1;
    for (let row = sensor[1] - outOfReach; row <= sensor[1] + outOfReach; row++) {
      const toSensor = Math.abs(row - sensor[1]);
      const distance = outOfReach - toSensor;
      if (check(sensor, [row, sensor[0] - distance])) return [row, sensor[0] - distance];
      if (check(sensor, [row, sensor[0] + distance])) return [row, sensor[0] + distance];
    }
  }

  for (let pair of pairs) {
    const point = processSensor(pair);
    if (point) {
      console.log(point);
      console.log(point[0] * 4000000 + point[1]);
      return;
    }
  }
};

part2();
