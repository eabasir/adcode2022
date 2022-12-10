const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt"), {
  encoding: "utf-8",
});

const trees = input.split("\n").map((line) => line.split("").map((x) => Number.parseInt(x)));

function buildTreesT() {
  const t = [];
  const row = trees[0];
  for (let j = 0; j < row.length; j++) {
    t.push(_.flatten(trees.map((x) => x[j])));
  }
  return t;
}

const treesT = buildTreesT();

let scores = [];

for (let i = 0; i < trees.length; i++) {
  const row = trees[i];
  for (let j = 0; j < row.length; j++) {
    const col = treesT[j];
    let rowScore = getScore(row, j);
    let colScore = getScore(col, i);
    scores.push(rowScore * colScore);
  }
}

// console.log(`-> `, scores);
console.log(`-> `, _.max(scores));

function getScore(arr, index) {
  const first = arr.slice(0, index).reverse();
  const second = arr.slice(index + 1);

  return getPartialScore(first, arr[index]) * getPartialScore(second, arr[index]);
}

function getPartialScore(arr, value) {
  partialScore = 0;
  for (const x of arr) {
    partialScore++;
    if (x >= value) {
      break;
    }
  }
  return partialScore;
}
