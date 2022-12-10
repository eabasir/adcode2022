const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("../input.txt", {
  encoding: "utf-8",
});

const lines = input.split("\n");

const prioSum = lines.reduce((acc, line) => {
  return acc + detectCommonChar(line);
}, 0);

console.log(`-> `, prioSum);


function detectCommonChar(line) {
  const first = line.slice(0, line.length / 2).split("");
  const second = line.slice(line.length / 2).split("");

  const commonChar = first.find((x) => second.includes(x));

  if (!commonChar) {
    throw new Error("could not find the common char");
  }

  return getConvertedCode(commonChar);
}

function getConvertedCode(char) {
  const assciCode = char.charCodeAt(0);
  if (assciCode >= "a".charCodeAt(0) && assciCode <= "z".charCodeAt(0)) {
    return assciCode - "a".charCodeAt(0) + 1;
  } else if (assciCode >= "A".charCodeAt(0) && assciCode <= "Z".charCodeAt(0)) {
    return assciCode - "A".charCodeAt(0) + 27;
  } else {
    throw new Error("invalid char");
  }
}
