"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "../IconComponents/Icon";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../ToastIcon";

interface ToastPopUpProps {
  state: "success" | "info" | "warning" | "error";
  size: "PC" | "MOBILE";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const ToastPopUp = ({
  state,
  size,
  title,
  message,
  duration = 3000,
  onClose,
}: ToastPopUpProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

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
      style: "bg-toastInfo",
      textColor: "text-gray8",
    },
    warning: {
      style: "bg-toastWarning",
      textColor: "text-white",
    },
    error: {
      style: "bg-toastError",
      textColor: "text-white",
    },
  };

  const defaultToastStyle =
    "fixed top-[160px] inset-x-0 mx-auto flex gap-x-[16px] justify-center items-center max-w-[640px] min-h-[56px] rounded-[10px] px-[16px] py-[8px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
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
            className="w-[24px] h-[24px]"
            onClick={() => setIsVisible(false)}
          >
            <CustomIcon
              icon="CLOSE_X"
              className={stateConfig[state].textColor}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastPopUp;
