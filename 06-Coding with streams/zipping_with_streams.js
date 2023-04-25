const { createReadStream, createWriteStream } = require("fs");
const { basename, join } = require("path");

const [, , fileName] = process.argv;
