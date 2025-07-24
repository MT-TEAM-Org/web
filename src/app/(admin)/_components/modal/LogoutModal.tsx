import { cn } from "@heroui/react";
import React from "react";
import { createPortal } from "react-dom";

interface LogoutModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const buttonStyle =
  "w-[160px] h-[40px] rounded-[5px] px-4 py-[13px] flex items-center justify-center font-bold text-[14px]";

const LogoutModal = ({ show, setShow }: LogoutModalProps) => {
  if (!show) return null;

  const button = [
    {
      name: "취소",
      style: "bg-white border border-gray3 text-gray7",
      onClick: () => setShow(false),
    },
    {
      name: "로그아웃",
      style: "bg-Primary text-white",
      onClick: () => {},
    },
  ];

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShow(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleClickOutside}
    >
      <div
        className="w-[408px] h-[200px] rounded-[10px] p-10 bg-white flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
            로그아웃 하시겠습니까?
          </h3>
          <p className="font-medium text-[16px] leading-6 tracking-[-0.02em] text-center text-gray6">
            다시 로그인 하셔야합니다.
          </p>
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          {button.map((button) => (
            <button
              key={button.name}
              className={cn(buttonStyle, button.style)}
              onClick={button.onClick}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
