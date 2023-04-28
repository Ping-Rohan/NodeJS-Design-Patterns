const Profiler = require("./Profiler");

function calculateFactorial(number) {
  const profile = Profiler("Factorial Application");
  profile.start();
  let Factorial = 1;

  for (let i = number; i >= 1; i--) {
    Factorial *= i;
  }
  profile.end();
  return Factorial;
}

let number = process.argv[2];
number = Number(number);
const factorial = calculateFactorial(number);
console.log("Your factorial is : ", factorial);

// hence using factory function we separate object creation from its implementation
