import { readFileSync } from "fs";
import path from "path";
import { range } from "../utils/index.mjs";

const schematic = readFileSync(
  path.join(path.resolve(), "input.txt"),
  "utf-8",
).split("\n");

let possibleGears = [];

schematic.forEach((line, lineNumber) => {
  const numbers = line.matchAll(/[0-9]+/g);
  for (const number of numbers) {
    const horizontalRange = range(number.index - 1, number[0].length + 2);
    const verticalRange = range(lineNumber - 1, 3);
    const coordinates = verticalRange.flatMap((y) =>
      horizontalRange.map((x) => [y, x]),
    );

    const possibleGearCoordinates = coordinates
      .map((coordinate) => {
        const [y, x] = coordinate;

        if (
          y >= 0 &&
          y < schematic.length &&
          x >= 0 &&
          x <= schematic[0].length
        ) {
          if (isMaybeGear(schematic[y][x])) {
            return { y, x, number: Number(number[0]) };
          }
        }
        return null;
      })
      .filter((coordinate) => coordinate !== null);

    possibleGears = possibleGears.concat(possibleGearCoordinates);
  }
});

const possibleGearsWithNumbers = possibleGears.reduce((acc, cur) => {
  const key = `${cur.y},${cur.x}`;
  if (acc[key]) {
    acc[key].push(cur.number);
  } else {
    acc[key] = [cur.number];
  }
  return acc;
}, {});

const sum = Object.keys(possibleGearsWithNumbers)
  .reduce((acc, key) => {
    const current = possibleGearsWithNumbers[key];
    if (current.length === 2) {
      acc.push(current);
    }
    return acc;
  }, [])
  .reduce((sum, cur) => sum + cur[0] * cur[1], 0);

console.log(sum);

function isMaybeGear(character) {
  return /[*]{1}/.test(character);
}
