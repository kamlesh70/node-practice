import fs from "fs";

setTimeout(() => {
  console.log("timeout 1");
}, 0);

setTimeout(() => {
  console.log("timeout 2");
}, 5);

setImmediate(() => {
  console.log("immediate 1");
});

setImmediate(() => {
  console.log("immediate 2");
});

fs.readFile("../../output.txt", (err, data) => {
  console.log("read file");
});

console.log("Starting");
