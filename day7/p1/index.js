const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt"), {
  encoding: "utf-8",
});

class Node {
  constructor(_parent) {
    this.parent = _parent;
    this.children = {};
  }
  size;
}

const fsTree = { "/": new Node(null) };
let current = fsTree["/"];

const lines = input.split("\n");
counter = 1;

function getCommand(line) {
  const commandStr = line.replace("$ ", "");
  const [type, value] = commandStr.split(" ").map((x) => x.trim());

  return { type, value };
}

function executeCD(command) {
  if (command.value === "..") {
    current = current.parent;
  } else {
    current = current.children[command.value];
  }
}

function executeLS() {
  counter++;
  while (counter < lines.length && !lines[counter].startsWith("$ ")) {
    if (lines[counter].startsWith("dir ")) {
      const name = lines[counter].replace("dir ", "");
      current.children[name] = new Node(current);
    } else {
      const [size, name] = lines[counter].split(" ");
      current.children[name] = new Node(current);
      current.children[name].size = Number.parseInt(size);
    }

    counter++;
  }
}

function buildFsTree() {
  while (counter < lines.length) {
    let command;
    if (lines[counter].startsWith("$ ")) {
      command = getCommand(lines[counter]);
    }
    if (command.type === "cd") {
      executeCD(command);
    } else if (command.type === "ls") {
      executeLS(command);
      continue;
    }

    counter++;
  }
}

function getNodeSize(node) {
  let totalSize = 0;
  if (node.size) {
    totalSize = node.size;
  } else {
    totalSize = Object.keys(node.children).reduce((acc, key) => {
      return acc + getNodeSize(node.children[key]);
    }, 0);
  }
  return totalSize;
}

buildFsTree();

const validSizes = [];

function traversal(node) {
  const nodeSize = getNodeSize(node);
  if (!node.size && nodeSize <= 100000) { // include only dirs with valid size
    validSizes.push(nodeSize);
  }
  const children = Object.values(node.children);
  for (const child of children) {
    traversal(child);
  }
}

traversal(fsTree["/"]);

console.log(
  `-> `,
  validSizes.reduce((acc, cur) => acc + cur)
);
