export class UnauthorizedException extends Error {
  constructor() {
    super("Authorization failed.");
  }
}
