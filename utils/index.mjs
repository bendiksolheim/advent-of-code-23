export function range(from, length) {
  return Array(length)
    .fill(from)
    .map((x, y) => x + y);
}
