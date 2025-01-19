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
