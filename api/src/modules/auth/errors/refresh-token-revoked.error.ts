export class RefreshTokenRevokedError extends Error {
  constructor() {
    super('Refresh token has been revoked.');
  }
}
