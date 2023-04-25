const { Readable } = require("stream");
const Chance = require("chance");

// chance will emmit random strings
const chance = new Chance();

class customReadable extends Readable {
  constructor(options) {
    // for internal implementation
    // options can be either encoding , objectMode , highWaterMark
    super(options);
    this.emittedBytes = 0;
  }

  _read(size) {
    const chunk = chance.string({ length: size });
    // this points to the read buffer
    this.push(chunk);
    this.emittedBytes += chunk.length;

    if (chance.bool({ likelihood: 5 })) {
      // final push to buffer
      this.push(null);
    }
  }
}

const readInstance = new customReadable();
readInstance
  .on("data", (chunk) => {
    console.log(chunk.toString());
  })
  .on("end", () => {
    console.log("Finished Reading");
  });

//   =================== READABLE STREAMS FROM ITERABLE =============

const mountains = [
  { name: "Everest", height: 8848 },
  { name: "K2", height: 8611 },
  { name: "Kangchenjunga", height: 8586 },
  { name: "Lhotse", height: 8516 },
  { name: "Makalu", height: 8481 },
];

const mountainStream = Readable.from(mountains);

mountainStream.on("data", (chunk) => {
  // we dont need to convert chunk to string for stdout because of object
  // also object mode is enabled automatically for Readable.from(iterable)
  console.log(chunk);
});
