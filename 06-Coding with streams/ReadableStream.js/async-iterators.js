// readable streams are also async iterators

async function iterator() {
  for await (let chunk of process.stdin) {
    console.log(chunk.toString());
  }
}

iterator();
