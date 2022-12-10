const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("../input.txt", {
  encoding: "utf-8",
});

const lines = input.split("\n");

groups = [];
lineCounter = 0;
while (lineCounter < lines.length) {
  let groupCounter = 0;
  const newGroup = [];
  while (groupCounter < 3) {
    newGroup.push(lines[lineCounter].split(""));
    groupCounter++;
    lineCounter++;
  }
  groups.push(newGroup);
}

const prioSum = groups.reduce((acc, group) => {
  return acc + detectCommonChar(group);
}, 0);

console.log(`-> `, prioSum);

function detectCommonChar(group) {
  const commonChar = group[0].find((x) => group[1].includes(x) && group[2].includes(x));

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
