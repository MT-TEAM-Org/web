import TermsServiceText from "@/app/_components/termsModal/TermsServiceText";
import { cn } from "@/utils";
import React from "react";

export const metadata = {
  metadataBase: new URL("https://playhive.co.kr/"),
  title: "PlayHive 이용약관",
  description: "PlayHive 이용약관 페이지입니다.",
  openGraph: {
    title: "PlayHive 이용약관",
    description: "PlayHive 이용약관 페이지입니다.",
    images: [
      {
        url: "/Metadata.png",
        width: 1200,
        height: 630,
        alt: "PlayHive 이미지",
      },
    ],
  },
};

const TermsOfService = () => {
  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm",
        "mobile:w-full"
      )}
    >
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center border-gray2 bg-white sticky top-0 z-10">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">이용약관</h1>
      </div>
      <div className="text-[14px] leading-[22px] tracking-[-0.02em] flex flex-col justify-between text-gray6 py-3 px-6">
        <TermsServiceText />
      </div>
    </div>
  );
};

export default TermsOfService;
