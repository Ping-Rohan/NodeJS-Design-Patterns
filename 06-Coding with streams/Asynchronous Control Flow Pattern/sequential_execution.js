// concatinate the content of different files to one file asynchronously using streams
// but here order matters like file-1 , file-2 ,file-3 contents will be concatinated

const { createReadStream, createWriteStream } = require("fs");
const { Transform, Readable } = require("stream");

const destination = process.argv[2];
const files = process.argv.slice(3);

const destinationStream = createWriteStream(destination);

class customTransform extends Transform {
  constructor(options = {}) {
    options.objectMode = true;
    super(options);
    this.promise = null;
  }

  _transform(filename, encoding, callback) {
    this.promise = new Promise((resolve, reject) => {
      const readableStream = createReadStream(filename);

      // end is false so not to end file
      readableStream.pipe(destinationStream, { end: false });
    });
    callback();
  }

  // we wont call callback here because it is called before promise.resolve()
  _final(callback) {
    Promise.resolve(this.promise);
  }
}

Readable.from(files)
  .pipe(new customTransform())
  .on("finish", () => {
    destinationStream.end();
  });
