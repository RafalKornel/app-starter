import { authApi, Profile } from "@/services/auth.api";
import { redirect } from "@tanstack/react-router";
import { create } from "zustand";

interface AuthStore {
  profile: Profile | null;
  logIn: (p: Profile) => void;
  logOut: () => void;
  loadProfile: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set, get) => ({
  profile: null,
  logIn: (p: Profile) => set({ profile: p }),
  logOut: () => set({ profile: null }),

  loadProfile: async () => {
    const { profile, logIn } = get();

    if (profile) {
      return;
    }

    await authApi
      .getProfile()
      .then((res) => {
        if (res) {
          logIn(res);
        } else {
          throw new Error("Not authorized");
        }
      })
      .catch(() => {
        throw redirect({ to: "/login" });
      });
  },
}));

export const getBeforeLoadAuthGuard = () => useAuth.getState().loadProfile;
