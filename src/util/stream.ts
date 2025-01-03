/*
  1. reading data from file and writing with the help of streams
*/
import fs from "fs";
import path from "path";

export function streams() {
  const readStream = fs.createReadStream(
    path.join(__dirname, "../../test.txt"),
    {
      highWaterMark: 2, // max size in bytes that will pass as chunk.
    }
  );

  const writeStream = fs.createWriteStream(
    path.join(__dirname, "../../output.txt"),
    {
      highWaterMark: 1, // max size of bytes that is allowed to be written
    }
  );

  // readStream.pipe(writeStream);

  readStream.on("data", function (chunk: Buffer) {
    console.log(chunk.toString(), chunk.length);
    if (!writeStream.write(chunk)) {
      readStream.pause();
      writeStream.once("drain", () => {
        readStream.resume();
      });
    }
  });

  readStream.on("end", function () {
    console.log("Finished reading file");
  });
}
