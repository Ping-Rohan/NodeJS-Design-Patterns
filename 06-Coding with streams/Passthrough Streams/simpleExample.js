// passthrough streams outputs evey chunk without  applying any sort of transformation

/* __PassThrough streams can be useful for observability or to implement late
 piping and lazy stream patterns__ */

// _For_Obseravability

// observe how much data is flowing through the streams

const { PassThrough } = require("stream");

let initialBytes = 0;
const monitor = new PassThrough();

monitor.on("data", (chunk) => {
  initialBytes += chunk.length;
});

monitor.on("finish", () => {
  console.log(initialBytes, `Passed through sterams..`);
});

monitor.write("hello world");
monitor.end("!");

/*

_MORE_PRACICAL_IMPLICATION

createReadStream(filename)
 .pipe(createGzip())
 .pipe(monitor)
 .pipe(createWriteStream(`${filename}.gz`))
 */
