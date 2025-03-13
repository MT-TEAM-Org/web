"use client";
import { useToastStore } from "@/utils/Store";
import ToastPopUp from "./_toastPopUp/toastPopUp";

export const ToastContainer = () => {
  const toast = useToastStore((state) => state.toast);

  if (!toast.visible) return null;

  const hideToast = useToastStore((state) => state.hideToast);

  return (
    <ToastPopUp
      state={toast.type}
      size={toast.size}
      title={toast.title}
      message={toast.message}
      onClose={hideToast}
    />
  );
};
