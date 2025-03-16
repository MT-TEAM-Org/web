"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "../IconComponents/Icon";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../ToastIcon";

interface ToastPopUpProps {
  visible: boolean;
  state: "success" | "info" | "warning" | "error";
  size: "PC" | "MOBILE";
  title: string;
  message: string;
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

  console.log(toastKey);

  useEffect(() => {
    if (visible) {
      setToastKey((prev) => prev + 1);
    }
  }, [visible]);

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
  //TODO: 종료 애니메이션이 작동 안 됨 / 애니메이션 효과 추후 수정 필요
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
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
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
            className="w-[24px] h-[24px]"
            onClick={() => {
              if (onClose) onClose();
            }}
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
