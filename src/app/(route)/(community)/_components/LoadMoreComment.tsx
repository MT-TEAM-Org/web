import Plus from "@/app/_components/icon/Plus";
import React from "react";

const LoadMoreComment = () => {
  return (
    <div className="flex items-center justify-center">
      <button className="w-[160px] min-h-[40px] rounded-[5px] border px-4 py-[10px] flex gap-2 justify-center items-center font-bold text-[14px] leading-[14px] border-[#DBDBDB] bg-gray1 text-[#424242] cursor-pointer">
        <Plus />
        댓글 더보기
      </button>
    </div>
  );
};

export default LoadMoreComment;
