import Single_logo from "@/app/_components/icon/Single_logo";
import React from "react";

interface RecommendButtonProps {
  handleCommend: () => void;
  recommendCount: number;
  isRecommend: boolean;
}

const RecommendButton = ({
  handleCommend,
  recommendCount,
  isRecommend,
}: RecommendButtonProps) => {
  const recommendButtonBaseStyle =
    "h-[40px] rounded-[5px] border px-[13px] py-4 flex gap-1 bg-white items-center justify-center text-[14px] font-bold";

  return (
    <div className="w-full h-auto flex justify-center gap-2">
      <button
        onClick={handleCommend}
        className={
          isRecommend
            ? `${recommendButtonBaseStyle} w-[123px] border-gra text-gra`
            : `${recommendButtonBaseStyle} w-[120px] border-gray3`
        }
      >
        <Single_logo width="16" height="16" fill="#00ADEE" />
        추천
        <span>{recommendCount >= 1 && recommendCount}</span>
      </button>
    </div>
  );
};

export default RecommendButton;
