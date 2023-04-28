// A proxy is an object that controls access to another object, called the subject.

// PROXY_USES

/*
    Data validation: The proxy validates the input before forwarding it to the
    subject

    Security: The proxy verifies that the client is authorized to perform the
    operation, and it passes the request to the subject only if the outcome of the
    check is positive

    Caching: The proxy keeps an internal cache so that the proxied operations
    are executed on the subject only if the data is not yet present in the cache

    Lazy initialization: If creating the subject is expensive, the proxy can delay
    it until it's really necessary

     Logging: The proxy intercepts the method invocations and the relative
    parameters, recoding them as they happen

    Remote objects: The proxy can take a remote object and make it appear local

*/

// SIMPLE STACK CALCULATOR

class StackCalculator {
  constructor() {
    this.stack = [];
  }

  putValue(value) {
    return this.stack.push(value);
  }

  getValue() {
    return this.stack.pop();
  }

  peekValue() {
    return this.stack[this.stack.length - 1];
  }

  clear() {
    this.stack = [];
  }

  divide() {
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }

  multiply() {
    const multiplicand = this.getValue();
    const multiplier = this.getValue();
    const result = multiplier * multiplicand;
    this.putValue(result);
    return result;
  }
}

// HERE IS HOW WE CAN USE STACK CALCULATOR CLASS

const calculator = new StackCalculator();

// NOW LETS IMPLEMENT SAME CALCULATOR USING PROXY PATTERN OR OBJECT COMPOSITION

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  divide() {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw new Error("Divisor is 0");
    }
    return this.calculator.divide();
  }

  // DELEGATED METHODS OR AUTHORIZED METHODS FROM ANOTHER CLASS

  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue() {
    return this.calculator.getValue();
  }

  peekValue() {
    return this.calculator.peekValue();
  }

  clear() {
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }
}

const safeCalculation = new SafeCalculator(calculator);

safeCalculation.putValue(4);
safeCalculation.putValue(0);

// NOW THIS THROWS AN ERROR
// OUR ACCESS WONT GO UPTO CALCULATOR BECAUSE PROXY WILL REJECT THE REQUEST

console.log(safeCalculation.divide());
