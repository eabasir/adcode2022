const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const { exit } = require("process");

const lines = fs
  .readFileSync(path.resolve(__dirname, "../input.txt"), {
    encoding: "utf-8",
  })
  .split("\n");

function printKnots() {
  minX = _.min(knots.map((knot) => knot.x));
  minY = _.min(knots.map((knot) => knot.y));

  maxX = _.max(knots.map((knot) => knot.x));
  maxY = _.max(knots.map((knot) => knot.y));

  for (let j = maxY; j >= minY; j--) {
    for (let i = minX; i <= maxX; i++) {
      const workingKnotIndex = knots.findIndex((knot) => knot.x === i && knot.y === j);
      process.stdout.write(workingKnotIndex !== -1 ? ` ${workingKnotIndex} ` : " - ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

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

const knots = Array(10)
  .fill()
  .map((x) => new Knot());
const h = knots[0];
const t = knots[knots.length - 1];

for (const line of lines) {
  const [command, steps] = line.split(" ");
  let counter = 0;

  while (counter < Number.parseInt(steps)) {
    h.move(command);
    for (let i = 1; i < knots.length; i++) {
      knots[i].moveTo(knots[i - 1]);
    }

    counter++;
  }
}

console.log(`-> `, t.visitedPositions.size);
