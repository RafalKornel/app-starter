import { authApi, Profile } from "@/services/auth.api";
import { create } from "zustand";
import { refreshTokenRevokedChannel } from "./refresh-token-revoked.channel";

interface AuthStore {
  profile: Profile | null;
  logIn: (p: Profile) => void;
  logOut: () => void;
  loadProfile: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set, get) => ({
  logIn: (p: Profile) => set({ profile: p }),
  logOut: () => set({ profile: null }),

  profile: null,
  loadProfile: async () => {
    const { profile, logIn } = get();

    if (profile) {
      return;
    }

    await authApi.getProfile().then((res) => {
      if (res) {
        logIn(res);
      } else {
        throw new Error("Not authorized");
      }
    });
  },
}));

refreshTokenRevokedChannel.subscribe(() => {
  useAuth.getState().logOut();
});
