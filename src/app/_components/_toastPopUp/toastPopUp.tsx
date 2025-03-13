"use client";
import { useEffect, useState } from "react";
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

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  // useEffect(() => {
  //   if (duration) {
  //     const timer = setTimeout(() => {
  //       handleClose();
  //     }, duration);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [duration]);

  if (!isVisible) return null;

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
    "fixed top-[160px] left-1/2 transform -translate-x-1/2 flex gap-x-[16px] justify-center items-center max-w-[640px] min-h-[56px] rounded-[10px] px-[16px] py-[8px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.1)]";

  return (
    <div className={`${defaultToastStyle} ${stateConfig[state].style}`}>
      {stateIcons[state]}
      <div
        className={`flex gap-x-[16px] w-[512px] min-h-[26px] ${stateConfig[state].textColor}`}
      >
        <div>{title}</div>
        <div>{message}</div>
      </div>
      <button className="w-[24px] h-[24px]" onClick={handleClose}>
        <CustomIcon icon="CLOSE_X" className={stateConfig[state].textColor} />
      </button>
    </div>
  );
};

export default ToastPopUp;
