const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("../input.txt", {
  encoding: "utf-8",
});

const [stacksInput, instructionsInput] = input.split("\n\n");

const stacksLines = stacksInput.split("\n");
const numbersLine = stacksLines.pop();

function buildCratesIndex() {
  const cratesIndexes = [];

  [...numbersLine].forEach((char, i) => {
    if (char !== " ") {
      cratesIndexes.push(i);
    }
  });
  return cratesIndexes;
}

function buildStacks() {
  const indexes = buildCratesIndex();
  const stacks = {};
  for (let i = stacksLines.length - 1; i >= 0; i--) {
    const line = stacksLines[i].split("");
    for (const [i, index] of indexes.entries()) {
      if (line[index] !== " ") {
        if (stacks[i + 1]) {
          stacks[i + 1].push(line[index]);
        } else {
          stacks[i + 1] = [line[index]];
        }
      }
    }
  }
  return stacks;
}

function applyInstructions() {
  const instructions = instructionsInput.split("\n");

  for (const instruction of instructions) {
    const qtyIndex = instruction.indexOf("move");
    const fromIndex = instruction.indexOf("from");
    const toIndex = instruction.indexOf("to");

    let qty = Number.parseInt(instruction.substring(qtyIndex, fromIndex).replace("move", "").trim());
    const from = instruction.substring(fromIndex, toIndex).replace("from", "").trim();
    const to = instruction.substring(toIndex).replace("to", "").trim();

    while (qty > 0) {
      const crate = stacks[from].pop();
      stacks[to].push(crate);
      qty--;
    }
  }
}

const stacks = buildStacks();

applyInstructions();

function getStacksTops() {
  let tops = "";
  for (const [key, stack] of Object.entries(stacks)) {
    tops += stack[stack.length - 1];
  }
  return tops;
}

console.log(`-> `, getStacksTops());
