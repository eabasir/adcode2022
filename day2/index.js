const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("./input.txt", {
  encoding: "utf-8",
});

const rounds = input.split("\n");

let rock = {},
  paper = {},
  scissors = {};

rock.value = 1;
rock.defeater = paper;
rock.defeating = scissors;
paper.value = 2;
paper.defeater = scissors;
paper.defeating = rock;
scissors.value = 3;
scissors.defeater = rock;
scissors.defeating = paper;

const symbols = {
  A: rock,
  X: rock,
  B: paper,
  Y: paper,
  C: scissors,
  Z: scissors,
};

let totalScore = rounds.reduce((acc, cur) => {
  const [action, reaction] = cur.split(" ");

  let roundScore = 0;
  if (symbols[reaction].value === symbols[action].value) {
    roundScore = 3;
  } else if (symbols[action].defeater.value === symbols[reaction].value) {
    roundScore = 6;
  }

  return acc + symbols[reaction].value + roundScore;
}, 0);
console.log(`-> `, totalScore);

// 2nd part

confrontSymbols = {
  X: 0,
  Y: 3,
  Z: 6,
};

totalScore = rounds.reduce((acc, cur) => {
  const [action, reaction] = cur.split(" ");

  roundScore = confrontSymbols[reaction];

  let react;
  if (roundScore === 0) {
    react = symbols[action].defeating
  } else if (roundScore === 3) {
    react = symbols[action];
  } else if (roundScore === 6) {
    react = symbols[action].defeater;
  }

  return acc + roundScore + react.value;
}, 0);

console.log(`-> `, totalScore);
