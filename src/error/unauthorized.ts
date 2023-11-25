export default class UnauthorizedError extends Error {
  constructor(public cause: string) {
    super('unauthorized');
    this.name = 'UnauthorizedError';
  }
}
