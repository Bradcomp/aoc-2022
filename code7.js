const getInput = require('./getInput');
const f = './input7.txt';

const input = getInput(f);

const cd = (state, dir) => {
  const {root, current} = state;
  if (dir === '/') return {root, current: []};
  if (dir === '..') {
    current.pop();
    return {root, current}
  }
  current.push(dir);
  return {root, current}
}

const ls = (state, input) => {
  const list = [];
  while (true) {
    const next = input.shift();
    if (next[0] === '$') {
      input.unshift(next);
      break;
    }
    list.push(next);
    if (input.length === 0) {
      break;
    }
  }

  let currentDirectory = state.root;
  for (let p of state.current) currentDirectory = currentDirectory.children[p];
  for (let f of list) {
    const [first, second] = f.split(' ');
    if (first === 'dir') {
      currentDirectory.children[second] = {children: {}, files: []};;
    } else {
      currentDirectory.files.push({name: second, size: parseInt(first)});
    }
  }
  return state;
};

const parseDirectory = () => {
  let root = {children: {}, files: []};
  let current = [];

  let state = {root, current};

  while (true) {
    if (!input.length) break;
    const cmd = input.shift().split(' ').slice(1);
    if (cmd[0] === 'ls') {
      state = ls(state, input)
    }
    if (cmd[0] === 'cd') {
      state = cd(state, cmd[1]);
    }
  }

  return state.root;
}


let onesBelow100k = 0;
const limit = 2036703; // calculated by hand
let smallestOver = Infinity;
const getSize = (directory, folderName) => {
  const fileSize = directory.files.reduce((acc, {size}) => acc + size, 0);
  const childrenKeys = Object.keys(directory.children);
  const childrenSize = childrenKeys.reduce((acc, dir) => { 
    return acc + getSize(directory.children[dir], dir);
  }, 0);
  directory.totalSize = childrenSize + fileSize;
  if (directory.totalSize <= 100000) onesBelow100k = onesBelow100k + directory.totalSize;
  console.log(folderName, directory.totalSize);
  if (directory.totalSize > limit && directory.totalSize < smallestOver) smallestOver = directory.totalSize;
  return directory.totalSize;
}
const part1 = () => {
  const directory = parseDirectory();
  console.log(JSON.stringify(directory, null, 2));
  getSize(directory, 'root');
  console.log(onesBelow100k);
  console.log(smallestOver);

}
part1();
