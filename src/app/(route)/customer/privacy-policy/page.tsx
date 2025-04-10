import TermsPersonalText from "@/app/_components/termsModal/TermsPersonalText";
import { cn } from "@/utils";
import React from "react";

export const metadata = {
  metadataBase: new URL("https://playhive.co.kr/"),
  title: "PlayHive 개인정보 취급방침",
  description: "PlayHive 개인정보 취급방침 페이지입니다.",
  openGraph: {
    title: "PlayHive 개인정보 취급방침",
    description: "PlayHive 개인정보 취급방침 페이지입니다.",
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

const Page = () => {
  return (
    <div
      className={cn(
        "w-full max-w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm",
        "mobile:w-full"
      )}
    >
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center sticky top-0 z-10 border-gray2 bg-white">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">
          개인정보 취급방침
        </h1>
      </div>
      <div className="text-[14px] leading-[22px] text-gray6 p-3">
        <TermsPersonalText />
      </div>
    </div>
  );
};

export default Page;
