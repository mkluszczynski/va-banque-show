export class Person {
  constructor(public name: string, public age: number) {}

  public sayHello(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}
