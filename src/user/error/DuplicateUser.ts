export default class DuplicateUserError extends Error {
  constructor() {
    super('duplicate username');
    this.name = 'DuplicateUserError';
  }
}
