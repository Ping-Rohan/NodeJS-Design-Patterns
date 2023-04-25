process.stdin
  .on("data", (chunk) => {
    console.log(chunk.toString());
  })
  .on("end", () => {
    console.log("Reading finished...");
  });
