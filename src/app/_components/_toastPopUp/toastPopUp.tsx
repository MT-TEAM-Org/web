"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "../IconComponents/Icon";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../ToastIcon";
import { cn } from "@/utils";

interface ToastPopUpProps {
  visible: boolean;
  state: "success" | "info" | "warning" | "error";
  size: "PC" | "MOBILE";
  title: string;
  message?: string;
  onClose?: () => void;
}

const ToastPopUp = ({
  state,
  size,
  title,
  message,
  onClose,
  visible,
}: ToastPopUpProps) => {
  const [toastKey, setToastKey] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (visible) {
      setToastKey((prev) => prev + 1);
    }
  }, [visible]);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width >= 360 && width <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stateIcons = {
    success: <SuccessIcon />,
    info: <InfoIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
  };

  const stateConfig = {
    success: {
      style: "bg-toastSuccess",
      textColor: "text-white",
    },
    info: {
      style: "bg-[#000000]",
      textColor: "text-white",
    },
    warning: {
      style: "bg-toastWarning",
      textColor: "text-warning",
    },
    error: {
      style: "bg-toastError",
      textColor: "text-white",
    },
  };

  const defaultToastStyle = cn(
    "fixed z-[999] inset-x-0 mx-auto flex gap-x-[16px] justify-center items-center max-w-[640px] min-h-[56px] rounded-[10px] px-[16px] py-[8px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]",
    "mobile:w-full mobile:max-w-[328px] mobile:h-[48px]",
    isMobile ? "bottom-[80px]" : "top-[40px]"
  );
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (!visible && onClose) {
          onClose();
        }
      }}
    >
      {visible && (
        <motion.div
          key={toastKey}
          initial={{ opacity: 0, y: isMobile ? 100 : -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? 100 : -100 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`${defaultToastStyle} ${stateConfig[state].style}`}
        >
          {stateIcons[state]}
          <div
            className={`flex gap-x-[16px] w-[512px] min-h-[26px] ${stateConfig[state].textColor}`}
          >
            <div>{title}</div>
            <div>{message}</div>
          </div>
          <button
            className="w-[24px] h-[24px] mobile:w-[24px] mobile:h-[24px]"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            <CustomIcon
              icon="CLOSE_X"
              className={stateConfig[state].textColor + " w-[14px] h-[14px]"}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastPopUp;
