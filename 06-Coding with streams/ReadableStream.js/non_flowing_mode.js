// by default streams are in non flowing mode
// chunk are received indemand

process.stdin.on("readable", () => {
  let chunk;

  // here we use while loop to make continious read
  // flowing mode doesnot need loop
  while ((chunk = process.stdin.read()) !== null) {
    console.log(`You entered ${chunk.toString()}`);
  }
});
