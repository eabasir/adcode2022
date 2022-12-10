const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("../input.txt", {
  encoding: "utf-8",
});

let i = 0;
let last4 = [];

while (i < input.length) {
  last4.push(input[i]);
  if (i >= 14) {
    last4 = last4.slice(last4.length - 14);
    last4Set = new Set(last4);
    if (last4Set.size === 14) {
      console.log(`-> `, i + 1);
      return;
    }
  }
  i++;
}
