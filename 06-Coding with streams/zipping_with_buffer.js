const { readFile, writeFile } = require("fs/promises");
const { createGzip } = require("zlib");
const { promisify } = require("util");
const zip = promisify(createGzip);

const [, , fileName] = process.argv;

async function zipWithBuffer() {
  const fileBuffer = await readFile(fileName);

  // zipping buffered content
  writeFile(`./Files/${fileName}-zipped.gz`, zip(fileBuffer));
  console.log("File was successfully compressed");
}

// This approach works fine for small files but throws an range error for larger files
// this approach also take huge amount of memory space
// solution for this is to use streams
