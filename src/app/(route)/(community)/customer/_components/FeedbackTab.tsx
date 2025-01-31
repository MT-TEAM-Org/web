import React from "react";
import Image from "next/image";

const FeedbackTab = () => {
  return (
    <div className="w-[1200px] h-[268px]">
      <div className="w-full max-w-[1200px] h-full max-h-[268px] rounded-[10px] flex justify-center items-center gap-[201px] bg-[#FAFAFA]">
        <div className="w-[428px] min-h-[132px] flex flex-col items-center justify-center gap-1">
          <div className="w-[80px] h-[80px] flex items-center justify-center">
            <Image
              src="/question_icon.png"
              alt="question_icon"
              width={60}
              height={60}
            />
          </div>

          <div className="w-full max-w-[428px] min-h-[48px] flex flex-col gap-1 items-center">
            <div className="w-auto h-[24px] font-[700] text-[16px] leading-6 align-center color-[#424242]">
              <p>등록된 공지사항이 없습니다.</p>
            </div>

            <div className="w-auto h-[20px] font-[500] text-[14px] leading-5 algin-center color-[#424242]">
              <p>궁금한 내용이 있다면 문의해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
