import { LogoWhite } from "@/app/_components/icon/LogoWhite";
import React from "react";

const EmptyComment = () => {
  return (
    <div className="w-full max-w-[800px] h-[184px] rounded-[10px] px-10 bg-[#FAFAFA] flex">
      <div className="w-full min-h-[104px] flex flex-col gap-4 items-center justify-center">
        <LogoWhite />
        <div className="flex flex-col items-center">
          <div>
            <p className="font-bold text-[16px] leading-6 align-center">
              등록된 댓글이 없습니다.
            </p>
          </div>
          <div>
            <p className="font-medium text-[14px] leading-5 align-center">
              이야기 나누고 싶다면 댓글을 남겨보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyComment;
