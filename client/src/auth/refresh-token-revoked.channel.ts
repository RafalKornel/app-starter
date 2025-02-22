class RefreshTokenRevokedChannel {
  static LABEL = "refresh-token-revoked";

  private channel = new BroadcastChannel(RefreshTokenRevokedChannel.LABEL);

  subscribe(callback: () => void) {
    this.channel.addEventListener(RefreshTokenRevokedChannel.LABEL, callback);
  }

  emit() {
    this.channel.dispatchEvent(new Event(RefreshTokenRevokedChannel.LABEL));
  }
}

export const refreshTokenRevokedChannel = new RefreshTokenRevokedChannel();
