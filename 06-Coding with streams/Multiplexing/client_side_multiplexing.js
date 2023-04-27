const { fork } = require("child_process");
const { connect } = require("net");

function multiplexChannels(sources, destination) {
  const channels = sources.length;

  for (let i = 0; i < sources.length; i++) {
    sources[i]
      .on("readable", () => {
        let chunk;
        while ((chunk = this.read()) !== null) {
          // 1 for channel ID , 4 for packet size and remaining for data
          const outBuffer = Buffer.alloc(1 + 4 + chunk.length);
          outBuffer.writeUint8(i, 0);
          outBuffer.writeInt32BE(chunk.length, 1);
          chunk.copy(outBuffer, 5);
          console.log(`Sending packet to channel: ${i}`);
          destination.write(outBuffer);
        }
      })
      .on("end", () => {
        if (--channels === 0) {
          destination.end();
        }
      });
  }
}

const socket = connect(3000, () => {
  const child = fork(process.argv[2], process.argv.slice(3), { silent: true });
  multiplexChannels([child.stdout, child.stderr], socket);
});
