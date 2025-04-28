import TermsPersonalText from "@/app/_components/termsModal/TermsPersonalText";
import { cn } from "@/utils";
import React from "react";

export const metadata = {
  title: "PlayHive 개인정보 취급방침",
  description: "PlayHive 개인정보 취급방침 페이지입니다.",
  openGraph: {
    title: "PlayHive 개인정보 취급방침",
    description: "PlayHive 개인정보 취급방침 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = () => {
  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm mb-10",
        "mobile:max-w-[768px] mobile:mb-0"
      )}
    >
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center sticky top-0 z-10 border-gray2 bg-white">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">
          개인정보 취급방침
        </h1>
      </div>
      <div className="text-[14px] leading-[22px] text-gray6 p-3 mx-3">
        <TermsPersonalText />
      </div>
    </div>
  );
};

export default Page;
