import Send_icon from "@/app/_components/icon/Send_icon";
import { Plus } from "lucide-react";
import React from "react";

const SendCommentBox = () => {
  return (
    <div className="w-full min-h-[72px] p-4 bg-white">
      <div className="w-full min-h-[40px] flex gap-4 items-center justify-between">
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-gray2 py-[10px] gap-[10px] bg-gray1">
          <Plus />
        </button>
        <input
          type="text"
          placeholder="상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"
          className="w-full max-w-[576px] h-[40px] rounded-[5px] border border-gray7 py-3 px-4 gap-4"
        />
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-[5px] border border-gray2 py-[16px] gap-[10px] bg-gray1">
          <Send_icon />
        </button>
      </div>
    </div>
  );
};

export default SendCommentBox;
