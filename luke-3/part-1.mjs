import { readFileSync } from "fs";
import path from "path";
import { range } from "../utils/index.mjs";

const schematic = readFileSync(
  path.join(path.resolve(), "input.txt"),
  "utf-8",
).split("\n");

let total = 0;

schematic.forEach((line, lineNumber) => {
  const numbers = line.matchAll(/[0-9]+/g);
  for (const number of numbers) {
    const horizontalRange = range(number.index - 1, number[0].length + 2);
    const verticalRange = range(lineNumber - 1, 3);
    const coordinates = verticalRange.flatMap((y) =>
      horizontalRange.map((x) => [y, x]),
    );

    const isPartNumber = coordinates
      .map((coordinate) => {
        const [y, x] = coordinate;

        if (
          y >= 0 &&
          y < schematic.length &&
          x >= 0 &&
          x <= schematic[0].length
        ) {
          if (isEngineSymbol(schematic[y][x])) {
            return true;
          }
        }
        return false;
      })
      .some((isEngineSymbol) => isEngineSymbol);

    if (isPartNumber) {
      total += Number(number[0]);
    }
  }
});

console.log(total);

function isEngineSymbol(character) {
  // we consider everything but letters, number and dot a symbol
  return !/[a-zA-Z0-9.]/.test(character);
}
