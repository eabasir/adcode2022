const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("../input.txt", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const fullOverlaps = lines.reduce((fullOverlaps, line) => {
  const [r1, r2] = line.split(",");
  const [r1l, r1u] = r1.split("-").map((x) => Number.parseInt(x));
  const [r2l, r2u] = r2.split("-").map((x) => Number.parseInt(x));

  if (r1l <= r2u && r2l <= r1u) {
    return fullOverlaps + 1;
  }
  return fullOverlaps;
}, 0);

console.log(`-> `, fullOverlaps);
