/* The most apparent situation in which we could benefit from the Builder pattern is
a class with a constructor that has a long list of arguments, or takes many complex
parameters as input.
 */

// SEE THIS CLASS TAKES SO MANY PARAMETERS

class Boat {
  constructor(
    hasMotor,
    motorCount,
    motorBrand,
    motorModel,
    hasSails,
    sailsCount,
    sailsMaterial,
    sailsColor,
    hullColor,
    hasCabin
  ) {}
}

// USING BUILDER DESIGN PATTERN

class BOAT {
  constructor(parameters) {
    // required variables here
  }
}

const boatInstance = new BOAT({
  hasMotor: true,
  motorCount: 3,
  motorBrand: "TATA",
  motorModel: "SUV",
  hasSails: true,
  sailsCount: 2,
  sailsMaterial: "Fabric",
  sailsColor: "Green",
  hullColor: "black",
  hasCabin: true,
});

/* HERE ANOTHER PROBLEM ARISES , IF USER INPUTS HAS MOTOR AS TRUE THEN HE NEEDS TO INPUT 
OTHER FIELDS TOO LIKE COUNT , BRAND  , MODEL AND MANY MORE */

/* The Builder pattern fixes even these last few flaws and provides a fluent interface
that is simple to read, self-documenting, and that provides guidance toward the
creation of a coherent object. Let's take a look at the BoatBuilder class, which
implements the Builder pattern for the Boat class: */

class BoatBuilder {
  withMotor(count, brand, model) {
    this.hasMotor = true;
    this.motorCount = count;
    this.motorBrand = brand;
    this.motorBrand = model;

    // to chain multiple methods we returned this
    return this;
  }

  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;
    return this;
  }

  hullColor(color) {
    this.hullColor = color;
    return this;
  }

  withCabin() {
    this.hasCabin = true;
    return this;
  }

  build() {
    return new BOAT({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    });
  }
}

// NOW OUR CLASS HAS BECAME SO INTUITIVE

const myBoat = new BoatBuilder()
  .withMotors(2, "Best Motor Co. ", "OM123")
  .withSails(1, "fabric", "white")
  .withCabin()
  .hullColor("blue")
  .build();

/*   _FINAL_SUMMARY_

   1) The main objective is to break down a complex constructor into multiple,
    more readable, and more manageable steps.

    2)Try to create builder methods that can set multiple related parameters at
    once.

    3) Deduce and implicitly set parameters based on the values received as input
    by a setter method, and in general, try to encapsulate as much parameter
    setting related logic into the setter methods so that the consumer of the
    builder interface is free from doing so.

    4)If necessary, it's possible to further manipulate the parameters (for example,
    type casting, normalization, or extra validation) before passing them to the
    constructor of the class being built to simplify the work left to do by the
    builder class consumer even more. 

*/
