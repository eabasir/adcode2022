const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const TOTAL_CYCLES = 240;
const CRT_WIDE = 40;

const lines = fs
  .readFileSync(path.resolve(__dirname, "../input.txt"), {
    encoding: "utf-8",
  })
  .split("\n");

let currentCycle = 1;
let lineNumber = 0;
let reg = 1;
let applyChange = false;
let xPos = 0;

function readLine(line) {
  let [cmd, value] = line.split(" ");
  value = Number.parseInt(value);
  return [cmd, value];
}

function processCycle(cmd, value) {
  if (cmd === "noop") {
    lineNumber++;
  }
  if (cmd === "addx") {
    if (applyChange) {
      reg += value;
      lineNumber++;
    }
    applyChange = !applyChange;
  }
  printPixel();
  currentCycle++;
}

function printPixel() {
  if (xPos == CRT_WIDE) {
    process.stdout.write("\n");
    xPos -= CRT_WIDE;
  }
  process.stdout.write([reg - 1, reg, reg + 1].includes(xPos) ? "#" : ".");
  xPos++;
}

function main() {
  printPixel();
  while (currentCycle < TOTAL_CYCLES) {
    const [cmd, value] = readLine(lines[lineNumber]);

    processCycle(cmd, value);
  }
  process.stdout.write("\n");
}

main();
