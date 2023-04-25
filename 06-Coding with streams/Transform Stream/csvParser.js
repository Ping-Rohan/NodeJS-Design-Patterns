const { parse } = require("csv-parse");
const { createReadStream } = require("fs");
const ParseCSV = parse({ columns: true });
const { Transform } = require("stream");

class customTransform extends Transform {
  constructor(country, options = {}) {
    super({ ...options, objectMode: true });
    this.country = country;
  }

  // filtering csv data by country name
  _transform(chunk, encoding, callback) {
    if (chunk.country === this.country) {
      // push to buffer
      this.push(JSON.stringify(chunk));
    }

    // callback so to point current operation is done
    callback();
  }

  // this runs at the end
  _final(callback) {
    console.log("Filtering Finished");
    callback();
  }
}

const Transformed = new customTransform("Italy");

createReadStream("./sample.csv").pipe(ParseCSV).pipe(Transformed).pipe(process.stdout);
