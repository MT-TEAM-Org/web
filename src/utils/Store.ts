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

interface EditableBoardData {
  categoryType: string;
  content?: string;
  title: string;
  link?: string;
  thumbnail?: string;
}

interface EditState {
  isEditMode: boolean;
  boardId: string | null;
  boardData: EditableBoardData | null;
  setEditMode: (isEdit: boolean) => void;
  setBoardId: (id: string | null) => void;
  setBoardData: (data: EditableBoardData | null) => void;
  resetEditState: () => void;
}

export const useEditStore = create<EditState>((set) => ({
  isEditMode: false,
  boardId: null,
  boardData: null,
  setEditMode: (isEdit) => set({ isEditMode: isEdit }),
  setBoardId: (id) => set({ boardId: id }),
  setBoardData: (data) => set({ boardData: data }),
  resetEditState: () =>
    set({ isEditMode: false, boardId: null, boardData: null }),
}));

interface InquiryPostIdState {
  inquiryPostIds: number[];
  addInquiryPostId: (id: number) => void;
  removeInquiryPostId: (id: number) => void;
  clearInquiryPostIds: () => void;
}

export const useInquiryPostIdStore = create<InquiryPostIdState>()(
  persist(
    (set) => ({
      inquiryPostIds: [],
      addInquiryPostId: (id) =>
        set((state) => ({
          inquiryPostIds: state.inquiryPostIds.includes(id)
            ? state.inquiryPostIds
            : [...state.inquiryPostIds, id],
        })),
      removeInquiryPostId: (id) =>
        set((state) => ({
          inquiryPostIds: state.inquiryPostIds.filter(
            (postId) => postId !== id
          ),
        })),
      clearInquiryPostIds: () => set({ inquiryPostIds: [] }),
    }),
    {
      name: "inquiry-post-id-storage",
    }
  )
);
