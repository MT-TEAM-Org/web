import React from "react";

export const metadata = {
  title: "서비스소개 페이지",
  description: "서비스소개 페이지입니다.",
  openGraph: {
    title: "서비스소개 페이지",
    description: "서비스소개 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "PlayHive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["플레이하이브", "서비스소개"],
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
