// this is how factory pattern really hides the private methods and object ,  provides access through the public interface only

function createPerson(name) {
  const privateProperties = {};

  const person = {
    setName(name) {
      if (!name) {
        throw new Error("A person must have a name");
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    },
  };

  // called first time to set name in privateProperties object
  person.setName(name);
  return person;
}

// here you cannot access private property directly but through public interface
const person = createPerson("rohan");
console.log(person.getName());
