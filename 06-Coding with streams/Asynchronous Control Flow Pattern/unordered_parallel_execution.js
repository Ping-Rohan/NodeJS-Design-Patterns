const { Transform, pipeline } = require("stream");
const { createReadStream, createWriteStream } = require("fs");
const split = require("split");
const superagent = require("superagent");

class parallelTransform extends Transform {
  constructor(userTransform, options) {
    super(options);
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCB = null;
  }

  _transform(chunk, encoding, done) {
    this.running++;
    this.userTransform(
      chunk,
      encoding,
      this.push.bind(this),
      this._onComplete.bind(this)
    );
    done();
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCB = done;
    } else {
      done();
    }
  }

  _onComplete(error) {
    this.running--;
    if (error) return this.emit("error", err);

    if (this.running === 0) {
      this.terminateCB && this.terminateCB();
    }
  }
}

// here split emits each line as chunk
pipeline(
  createReadStream(process.argv[2]),
  split(),
  new parallelTransform(async (url, enc, push, done) => {
    if (!url) {
      return done();
    }
    try {
      await superagent.head(url, { timeout: 5 * 1000 });
      push(`${url} is up\n`);
    } catch (err) {
      push(`${url} is down\n`);
    }
    done();
  }),
  createWriteStream("results.txt"),
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("All urls have been checked");
  }
);
