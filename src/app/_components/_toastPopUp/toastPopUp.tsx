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
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
    // visible이 false로 바뀌면 exit 애니메이션이 시작됨
    // shouldRender는 애니메이션 완료 후에 변경됨
  }, [visible]);

  const handleExitComplete = () => {
    // visible이 false일 때만 shouldRender를 false로 설정
    if (!visible) {
      setShouldRender(false);
    }
  };

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
      {visible && (
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
          <button className="w-[24px] h-[24px]" onClick={onClose}>
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
