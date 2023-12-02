import { readFileSync } from "fs";
import path from "path";

const constraints = { red: 12, green: 13, blue: 14 };
const gameNumRegex = /Game (?<gamenum>[0-9]+):.*/;
const setsRegex = /Game [0-9]+: (?<sets>.*)$/;
const cubeRegex = /(?<count>[0-9]+) (?<color>.*)$/;

const games = readFileSync(path.join(path.resolve(), "input.txt"), "utf-8")
  .split("\n")
  .filter((line) => line !== "");

const possibleGames = games.map((game) => {
  const gameNum = gameNumRegex.exec(game).groups["gamenum"];

  const withinConstraints = setsRegex
    .exec(game)
    .groups["sets"].split("; ")
    .flatMap((set) =>
      set.split(", ").map((cube) => {
        const { count, color } = cubeRegex.exec(cube).groups;
        return count <= constraints[color];
      }),
    )
    .every((within) => within);

  return withinConstraints ? Number(gameNum) : 0;
});

const sum = possibleGames.reduce((acc, cur) => acc + cur);

console.log(sum);
