"use client";

import { cn } from "@/utils";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  closeButton?: boolean;
  button?: {
    text: string;
    onClick: () => void;
  };
}
// 버튼 활성화했을 때 hydration 오류 발생
const Toast = ({ title, message, type, closeButton, button }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const buttonState = closeButton || button;

  useEffect(() => {
    if (buttonState) return;
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // 아이콘 추가
  const toastType = {
    success: { bgColor: "#009AD4", color: "white" },
    info: { bgColor: "white", color: "#303030" },
    warning: { bgColor: "white", color: "#D1504B" },
    error: { bgColor: "#D1504B", color: "white" },
  };

  const defaultToastStyle = `mx-auto mt-10 flex justify-between items-center gap-[16px] max-w-[640px] min-h-[56px] rounded-[10px] px-[16px] py-[8px] shadow-lg ${
    !buttonState && "animate-fadeOut"
  }`;
  return (
    <div
      className={defaultToastStyle}
      style={{
        backgroundColor: toastType[type].bgColor,
        color: toastType[type].color,
      }}>
      <h1 className="font-[700] leading-[26px]">{title}</h1>
      <p className="flex-1 leading-[26px]">{message}</p>

      <div>
        {button && (
          <button
            onClick={button.onClick}
            className={cn(
              "bg-[#009AD4] text-white font-[500] rounded-[10px] px-[16px] py-[8px] hover:bg-[#007A9A] transition-all",
              type === "warning" && "border border-warning"
            )}>
            {button.text}
          </button>
        )}
        {closeButton && (
          <button
            className={cn(
              "bg-[#009AD4] text-white font-[500] rounded-[10px] px-[16px] py-[8px] hover:bg-[#007A9A] transition-all",
              type === "warning" && "text-black"
            )}
            onClick={() => setIsVisible(false)}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
