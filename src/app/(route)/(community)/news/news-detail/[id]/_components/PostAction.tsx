import Copy from "@/app/_components/icon/Copy";
import Share from "@/app/_components/icon/Share";
import React from "react";

const PostAction = () => {
  const copyBtn = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!"); // 임시
    } catch (err) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-auto flex justify-between">
      <button className="min-w-[104px] w-auto min-h-[32px] rounded-[5px] text-[14px] font-[500] leading-[14px] flex items-center justify-center bg-white px-3 py-[9px] border border-gray3">
        기사 원문 보기
      </button>
      <div className="flex gap-2">
        <button
          onClick={copyBtn}
          className="min-w-[138px] w-auto min-h-[32px] flex justify-center gap-1 items-center bg-white px-3 py-2 rounded-[5px] border border-gray3 text-[14px] leading-[14px] font-medium"
        >
          <Copy />
          게시글 URL 복사
        </button>
        <button className="min-w-[91px] w-auto min-h-[32px] flex justify-center gap-1 items-center bg-white pr-[12px] pl-[10px] py-2 rounded-[5px] border border-gray3 text-[14px] leading-[14px] font-medium">
          <Share />
          공유하기
        </button>
      </div>
    </div>
  );
};

export default PostAction;
