class Profiler {
  constructor(label) {
    this.startTime = null;
    this.label = label;
  }

  start() {
    this.startTime = process.hrtime();
  }

  end() {
    const difference = process.hrtime(this.startTime);

    console.log(
      `Timer ${this.label} took ${difference[0]} Seconds and ${difference[1]} nanoseconds`
    );
  }
}

module.exports = (label) => {
  if (process.env === "production") {
    return new Error("Cannot profile in production environment");
  } else {
    return new Profiler(label);
  }
};
