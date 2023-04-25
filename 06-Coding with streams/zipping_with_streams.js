const { createReadStream, createWriteStream } = require("fs");
const { basename, join } = require("path");
const { createGzip } = require("zlib");

const [, , fileName] = process.argv;

function zipWithStreams() {
  const destinationPath = join("Files", basename(fileName));

  const readStream = createReadStream(fileName);
  const writeStream = createWriteStream(`${destinationPath}.gz`);

  // zipping with streams
  readStream
    .pipe(createGzip())
    .pipe(writeStream)
    .on("finish", () => {
      console.log("File zipped successfully");
    });
}

zipWithStreams();
