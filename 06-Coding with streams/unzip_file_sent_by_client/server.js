const { createServer } = require("http");
const { createWriteStream } = require("fs");
const { createGunzip } = require("zlib");

const server = createServer((request, response) => {
  const fileName = request.headers["x-filename"];
  const writeStream = createWriteStream(`../Files/received-${fileName}`);

  // piping
  // request is readable stream
  request
    .pipe(createGunzip())
    .pipe(writeStream)
    .on("finish", () => {
      response.writeHead(200);
      response.end("Zipped Successfully.....");
    });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server started");
});
