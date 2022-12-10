const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const lines = fs
  .readFileSync(path.resolve(__dirname, "../input.txt"), {
    encoding: "utf-8",
  })
  .split("\n");

class Knot {
  visitedPositions = new Set();

  constructor() {
    this.x = 0;
    this.y = 0;
    this.visitedPositions.add(`${this.x},${this.y}`);
  }

  moveTo(anotherKnot) {
    if (this.isTouching(anotherKnot)) {
      return;
    }

    this.x = (this.x + anotherKnot.x) / 2;
    this.y = (this.y + anotherKnot.y) / 2;

    if (!Number.isInteger(this.x)) {
      this.x = anotherKnot.x;
    }

    if (!Number.isInteger(this.y)) {
      this.y = anotherKnot.y;
    }

    this.visitedPositions.add(`${this.x},${this.y}`);
  }

  isTouching(anotherKnot) {
    return !(Math.abs(this.x - anotherKnot.x) > 1 || Math.abs(this.y - anotherKnot.y) > 1);
  }

  move(command) {
    switch (command) {
      case "R":
        this.x++;
        break;
      case "U":
        this.y++;
        break;
      case "L":
        this.x--;
        break;
      case "D":
        this.y--;
    }
    this.visitedPositions.add(`${this.x},${this.y}`);
  }
}

const h = new Knot();
const t = new Knot();

for (const line of lines) {
  const [command, steps] = line.split(" ");

  let counter = 0;
  while (counter < Number.parseInt(steps)) {
    h.move(command);
    t.moveTo(h);
    counter++;
  }
}

console.log(`-> `, t.visitedPositions.size);
