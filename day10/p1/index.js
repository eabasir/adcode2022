const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const FIRST_CHECK_CYCLE = 20;
const RECURRING_CHECK_CYCLE = 40;

const lines = fs
  .readFileSync(path.resolve(__dirname, "../input.txt"), {
    encoding: "utf-8",
  })
  .split("\n");

// the register value at each cycle
const regValues = [1];

for (const line of lines) {
  let [command, value] = line.split(" ");
  value = Number.parseInt(value);

  const lastValue = regValues[regValues.length - 1];

  if (command === "noop") {
    regValues.push(lastValue);
  }
  if (command === "addx") {
    regValues.push(...[lastValue, lastValue + value]);
  }
}

function checkStrengthAfter(count) {
  let cycleToCheck = FIRST_CHECK_CYCLE - 1;
  if (cycleToCheck > regValues.length) {
    return null;
  }

  let strengthSum = regValues[cycleToCheck] * (cycleToCheck + 1);

  let i = 0;
  while (i < count - 1) {
    cycleToCheck += RECURRING_CHECK_CYCLE;
    if (cycleToCheck > regValues.length) {
      break;
    }
    strengthSum += regValues[cycleToCheck] * (cycleToCheck + 1);
  }

  return strengthSum;
}
console.log(`-> `, checkStrengthAfter(6));
