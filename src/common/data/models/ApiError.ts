export class ApiError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }

  get [Symbol.toStringTag]() {
    return "Api Error: " + this.message;
  }
}