import { useToastStore } from "@/utils/Store";

export const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);

  return {
    success: (title: string, message: string) =>
      showToast("success", title, message),
    info: (title: string, message: string) => showToast("info", title, message),
    warning: (title: string, message: string) =>
      showToast("warning", title, message),
    error: (title: string, message: string) =>
      showToast("error", title, message),
  };
};
