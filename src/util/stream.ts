/*
  1. reading data from file and writing with the help of streams
*/
import fs from "fs";
import path from "path";
import { pipeline, Readable, Transform, Writable } from "stream";

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

  const readableStream = new Readable({
    objectMode: true, // object mode is used when reading object
    read() {},
  });

  const writable = new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
      // writable.emit("error", new Error("testing error "));
      console.log("Writing to file:", chunk);
      callback(null);
    },
  });

  readableStream.push({ test: "hello!" });

  const transform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      if (typeof chunk == "object" && "test" in chunk) {
        chunk.test = "transformed";
      }
      callback(null, chunk);
    },
  });

  // pipe is used to connect streams but if any stream fail it doesn't close all the streams. We can use pipeline instead.
  // readableStream.pipe(transform).pipe(writeStream);
  pipeline(readableStream, transform, writable, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("stream finished");
    }
  });
}
