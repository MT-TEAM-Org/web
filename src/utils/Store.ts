import { create } from "zustand";
import { persist } from "zustand/middleware";

type SocialState = "google" | "naver" | "kakao" | "discord" | "";

interface SocialStateStore {
  social: SocialState;
  setSocial: (social: SocialState) => void;
  resetSocial: () => void;
}

export const useSocialStore = create<SocialStateStore>()(
  persist(
    (set) => ({
      social: "",
      setSocial: (social) => set({ social }),
      resetSocial: () => set({ social: "" }),
    }),
    {
      name: "social-storage",
    }
  )
);

type SignState = "login" | "signup" | "";

interface SignupStateStore {
  signStateStore: SignState;
  setSignupStore: () => void;
  setClearSignupStore: () => void;
}

export const useSignupStore = create<SignupStateStore>((set) => ({
  signStateStore: "",
  setSignupStore: () => set({ signStateStore: "signup" }),
  setClearSignupStore: () => set({ signStateStore: "" }),
}));
