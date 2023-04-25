// by default streams are in non flowing mode
// chunk are received indemand

process.stdin.on("readable", () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    console.log(`You entered ${chunk.toString()}`);
  }
});
