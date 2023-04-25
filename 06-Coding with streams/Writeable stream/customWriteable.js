const { Writable } = require("stream");

export class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }
  _write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  }
}
