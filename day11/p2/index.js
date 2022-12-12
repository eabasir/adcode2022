const fs = require("fs");
const rd = require("readline");
const _ = require("lodash");
const path = require("path");

const ROUNDS = 10000;

const monkeys = [];
class Monkey {
  operation;
  test;
  holdings = [];
  operation;
  testDeviser;
  testTruthyTarget;
  testFalsyTarget;
  inspectionTime = 0;

  setHoldings(holdings) {
    this.holdings.push(...holdings);
  }

  setOperation(op) {
    this.operation = function () {
      const convertedOp = op.replace(/old/g, this.holdings[0]);
      const superMod = this.holdings.reduce((acc, cur) => acc * cur, 1);
      this.holdings[0] = eval(convertedOp) % superMod;
    };
  }

  setTestDeviser(deviser) {
    this.deviser = deviser;
  }
  setTestTruthyTarget(idx) {
    this.testTruthyTarget = idx;
  }
  setTestFalsyTarget(idx) {
    this.testFalsyTarget = idx;
  }
  throw() {
    monkeys[Number.isInteger(this.holdings[0] / this.deviser) ? this.testTruthyTarget : this.testFalsyTarget].setHoldings([this.holdings[0]]);
    this.holdings.splice(0, 1);
  }

  play() {
    while (this.holdings.length > 0) {
      this.inspectionTime++;
      this.operation();
      this.throw();
    }
  }
}

function init() {
  var lineReader = rd.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, "../sample.txt")),
  });

  lineReader.on("line", function (line) {
    if (line.includes("Monkey")) {
      monkeys.push(new Monkey());
    } else {
      const monkey = monkeys[monkeys.length - 1];
      if (line.includes("Starting items:")) {
        const holdings = line.match(/\d+/g).map((x) => Number.parseInt(x));
        monkey.setHoldings(holdings);
      } else if (line.includes("Operation: new =")) {
        const op = line.replace("Operation: new =", "").trim();
        monkey.setOperation(op);
      } else if (line.includes("Test: divisible by")) {
        const deviser = Number.parseInt(line.match(/\d+/)[0]);
        monkey.setTestDeviser(deviser);
      } else if (line.includes("If true: throw to monkey")) {
        const idx = Number.parseInt(line.match(/\d+/)[0]);
        monkey.setTestTruthyTarget(idx);
      } else if (line.includes("If false: throw to monkey")) {
        const idx = Number.parseInt(line.match(/\d+/)[0]);
        monkey.setTestFalsyTarget(idx);
      }
    }
  });

  lineReader.on("close", function () {
    let counter = 1;
    while (counter <= ROUNDS) {
      for (const monkey of monkeys) {
        monkey.play();
      }

      counter++;
    }

    const sortedInspections = monkeys.map((x) => x.inspectionTime).sort((a, b) => b - a);

    console.log(`-> `, sortedInspections);
    console.log(
      `-> `,
      monkeys.map((x) => x.holdings)
    );

    // console.log(`-> `, sortedInspections[0] * sortedInspections[1]);
  });
}

init();
