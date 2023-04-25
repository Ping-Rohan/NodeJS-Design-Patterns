const { request } = require("http");
const { createReadStream } = require("fs");
const { basename } = require("path");
const { createGzip } = require("zlib");

const [, , filePath] = process.argv;

const httpHeaders = {
  hostname: "127.0.0.1",
  port: 3000,
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": basename(filePath),
  },
};

const socket = request(httpHeaders, (response) => {
  console.log(`Server responded with status code ${response.statusCode}`);
});

// here socket is writeable stream
createReadStream(filePath).pipe(createGzip()).pipe(socket);
