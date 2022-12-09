const getInput = require('./getInput');
const f = './input9.txt';

const input = getInput(f).map((row) => {
  const [dir, count] = row.split(' ');
  return {
    dir,
    count: parseInt(count)
  };
});

const move = (dir, x, y) => {
  switch (dir) {
    case 'U': return [x, y + 1];
    case 'D': return [x, y - 1];
    case 'L': return [x - 1, y];
    case 'R': return [x + 1, y];
  }
};

const diffs = ([x1, y1], [x2, y2]) => {
  return [x1 - x2, y1 - y2];
};
const touching = ([x, y]) => {
  return Math.abs(x) <= 1 && Math.abs(y) <= 1;
}

const part1 = () => {
  const visited = new Set();
  input.reduce((acc, {dir, count}) => {
    let head = acc.head;
    let tail = acc.tail;
    for (let i = 0; i < count; i++) {
      head = move(dir, head[0], head[1]);
      const delta = diffs(head, tail);

      if (touching(delta)) continue;

      const deltaX = delta[0] > 0 ? Math.max(delta[0] - 1, 1) :
        delta[0] < 0 ? Math.min(delta[0] + 1, -1) :
        0;

      const deltaY = delta[1] > 0 ? Math.max(delta[1] - 1, 1) :
        delta[1] < 0 ? Math.min(delta[1] + 1, -1) :
        0;
      tail = [tail[0] + deltaX, tail[1] + deltaY];
      visited.add(tail.join(','));
    }
    return {head, tail};
  }, {head: [0, 0], tail: [0, 0]});
  console.log(visited.size);
}
part1();

const part2 = () => {
  const visited = new Set();

  input.reduce((acc, {dir, count}) => {
    console.log(dir, count);
    // For each move
    for (let j = 0; j < count; j++) {
      // go through all the tails
      // [0, 1], [1, 2], [2, 3], ..., [8, 9]
      acc[0] = move(dir, acc[0][0], acc[0][1]);
      for (let i = 0; i < acc.length - 1; i++) {
        let head = acc[i];
        let tail = acc[i + 1];

        const delta = diffs(head, tail);

        let deltaX = delta[0] > 0 ? Math.max(delta[0] - 1, 1) :
          delta[0] < 0 ? Math.min(delta[0] + 1, -1) :
          0;

        let deltaY = delta[1] > 0 ? Math.max(delta[1] - 1, 1) :
          delta[1] < 0 ? Math.min(delta[1] + 1, -1) :
          0;

        if (touching(delta)) deltaX = deltaY = 0;

        tail = [tail[0] + deltaX, tail[1] + deltaY];
        // if it's the final tail
        if (i + 2 === acc.length) {
          visited.add(tail.join(','));
        }
        acc[i + 1] = tail;
      }
    }
    return acc;
    
  }, [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);
  console.log(visited.size);
};

part2();
