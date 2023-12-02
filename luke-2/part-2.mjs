import { readFileSync } from "fs";
import path from "path";

const gameNumRegex = /Game (?<gamenum>[0-9]+):.*/;
const setsRegex = /Game [0-9]+: (?<sets>.*)$/;
const cubeRegex = /(?<count>[0-9]+) (?<color>.*)$/;

const games = readFileSync(path.join(path.resolve(), "input.txt"), "utf-8")
  .split("\n")
  .filter((line) => line !== "");

const maxValues = games.map((game) => {
  const gameNum = gameNumRegex.exec(game).groups["gamenum"];

  const cubes = setsRegex
    .exec(game)
    .groups["sets"].split("; ")
    .flatMap((set) =>
      set.split(", ").map((cube) => {
        const { count, color } = cubeRegex.exec(cube).groups;
        return { [color]: Number(count) };
      }),
    );

  const largestValues = cubes.reduce(
    (acc, cur) => {
      const { red, green, blue } = cur;
      return {
        red: red > acc.red ? red : acc.red,
        green: green > acc.green ? green : acc.green,
        blue: blue > acc.blue ? blue : acc.blue,
      };
    },
    { red: 0, green: 0, blue: 0 },
  );

  return largestValues;
});

const sum = maxValues.reduce(
  (acc, cur) => acc + cur.red * cur.green * cur.blue,
  0,
);

console.log(sum);
