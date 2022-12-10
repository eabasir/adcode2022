const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt"), {
  encoding: "utf-8",
});

const trees = input.split("\n").map((line) => line.split("").map((x) => Number.parseInt(x)));

let visibles = 2 * trees.length + 2 * trees[0].length - 4;

function buildTreesT() {
  const t = [];
  const row = trees[0];
  for (let j = 0; j < row.length; j++) {
    t.push(_.flatten(trees.map((x) => x[j])));
  }
  return t;
}

const treesT = buildTreesT();

for (let i = 1; i < trees.length - 1; i++) {
  const row = trees[i];
  for (let j = 1; j < row.length - 1; j++) {
    const col = treesT[j];
    const rowVisibility = isVisible(row, j);
    const colVisibility = isVisible(col, i);
    if (rowVisibility || colVisibility) {
    //   console.log(`-> ${row[j]} has ${rowVisibility},${colVisibility} visibility at ${i},${j}`);
      visibles++;
    }
  }
}
console.log(`-> `, visibles);

function isVisible(arr, index) {
  const first = arr.slice(0, index + 1);
  const second = arr.slice(index);
  let localVisibility = 0;
  if (isMax(first, first.length - 1)) {
    localVisibility++;
  }
  if (isMax(second, 0)) {
    localVisibility++;
  }

  return localVisibility;
}

function isMax(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= arr[index] && i !== index) {
      return false;
    }
  }
  return true;
}
