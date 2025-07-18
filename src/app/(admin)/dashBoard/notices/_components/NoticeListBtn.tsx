import { onlyNoticeButtons } from "@/app/(admin)/_constants/onlyNoticeButtons";
import { cn } from "@/utils";
import React from "react";

interface NoticeListBtnProps {
  handleNoticeButton: (value: string) => void;
}

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const NoticeListBtn = ({ handleNoticeButton }: NoticeListBtnProps) => {
  return (
    <div className="flex gap-2">
      {onlyNoticeButtons.map((button) => (
        <button
          key={button.value}
          className={cn(buttonStyle, button.style)}
          onClick={() => handleNoticeButton(button.value)}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default NoticeListBtn;
