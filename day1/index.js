const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("./input.txt", {
  encoding: "utf-8",
});

const elves = input.split("\n\n");

const elvesScores = elves.map((elf) => {
  const scores = elf.split("\n");
  elfScore = scores.reduce((acc, cur) => {
    return acc + Number.parseInt(cur);
  }, 0);
  return elfScore;
});

console.log(`-> `, _.max(elvesScores));

sortedScores = elvesScores.sort((a, b) => b - a);
console.log(
  `-> `,
  sortedScores.slice(0, 3).reduce((acc, cur) => acc + cur, 0)
);
