import { Person } from "./test/person";

const person = new Person("John", 28);

setTimeout(() => {
  console.log(person.sayHello());
}, 1000);
