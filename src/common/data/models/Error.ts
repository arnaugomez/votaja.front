export class Err {
  message: string;
  constructor(message: string) {
    this.message = message;
  }

  get [Symbol.toStringTag]() {
    return "Error: " + this.message;
  }
}

export type Data<T extends object> = { err?: Err } & T;
