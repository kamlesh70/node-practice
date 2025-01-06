const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

fs.readFile(__filename, () => {
  console.log("File Read");
  setTimeout(() => console.log("Timeout after File Read"), 0);
  setImmediate(() => console.log("Immediate after File Read"));
});

console.log("End");
