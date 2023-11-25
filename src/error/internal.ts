export default class InternalError extends Error {
  constructor(public error: unknown, message: string) {
    super(message);
    this.name = error instanceof Error ? error.name : 'internal error';
  }
}
