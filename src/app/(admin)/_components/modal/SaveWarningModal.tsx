import { cn } from "@heroui/react";
import React from "react";
import { createPortal } from "react-dom";

interface SaveWarningModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const buttonStyle =
  "w-[160px] h-[40px] rounded-[5px] px-4 py-[13px] flex items-center justify-center font-bold text-[14px]";

const SaveWarningModal = ({ show, setShow }: SaveWarningModalProps) => {
  if (!show) return null;

  const button = [
    {
      name: "나가기",
      style: "bg-white border border-gray3 text-gray7",
      onClick: () => setShow(false),
    },
    {
      name: "저장 후 나가기",
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
        className="w-[408px] h-[224px] rounded-[10px] p-10 bg-white flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
            변경사항이 저장되지 않았습니다.
          </h3>
          <p className="font-medium text-[16px] leading-6 tracking-[-0.02em] text-center text-gray6">
            저장을 하지 않고 나가면 변경사항이 적용되지 <br />
            않습니다. 그래도 나가시겠습니까?
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

export default SaveWarningModal;
