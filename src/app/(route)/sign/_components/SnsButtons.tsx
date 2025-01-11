"use client";

import { useApiMutation } from "@/_hooks/query";
import { Discord } from "@/app/_components/icon/Discord";
import { Google } from "@/app/_components/icon/Google";
import { Kakao } from "@/app/_components/icon/Kakao";
import { Naver } from "@/app/_components/icon/Naver";

const SnsButtons = () => {
  const snsButtonObject = [
    {
      name: "naver",
      icon: <Naver />,
    },
    {
      name: "kakao",
      icon: <Kakao />,
    },
    {
      name: "google",
      icon: <Google />,
    },
    {
      name: "discord",
      icon: <Discord />,
    },
  ];

  const snsGrayLine = () => {
    return <div className="w-[117px] h-[1px] border-[1px] border-[#EEEEEE]" />;
  };

  return (
    <>
      <div className="flex items-center min-h-[18px] gap-[8px]">
        {snsGrayLine()}
        <p className="w-[78px] text-center text-[12px] text-[#000000] opacity-[50%] leading-[18px] whitespace-nowrap tracking-[-0.02em]">
          SNS 간편로그인
        </p>
        {snsGrayLine()}
      </div>
      <div className="flex gap-[24px] justify-around mt-[8px]">
        {snsButtonObject.map((snsButton) => (
          <button
            className="w-[52px] h-[52px] flex justify-center items-center p-[10px] border-[1px] bg-[#FAFAFA] border-[#EEEEEE] rounded-full"
            type="button"
            key={snsButton.name}
          >
            {snsButton.icon}
          </button>
        ))}
      </div>
    </>
  );
};

export default SnsButtons;
