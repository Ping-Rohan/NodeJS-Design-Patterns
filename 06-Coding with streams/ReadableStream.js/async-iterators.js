// readable streams are also async iterators

for await (let chunk of process.stdin) {
  console.log(chunk.toString());
}
