export class Err {
  message: string;
  constructor(message: string) {
    this.message = message;
  }

  get [Symbol.toStringTag]() {
    return "Error: " + this.message;
  }
}