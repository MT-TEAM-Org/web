import React from "react";
import TermsLayout from "../../_components/common/TermsLayout";
import TermsServiceText from "@/app/_components/termsModal/TermsServiceText";

export const metadata = {
  title: "Playhive - 이용약관",
  description: "Playhive 이용약관 페이지입니다.",
  openGraph: {
    title: "Playhive - 이용약관",
    description: "Playhive 이용약관 페이지입니다.",
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

const TermsOfService = () => {
  return (
    <TermsLayout title="이용약관">
      <TermsServiceText />
    </TermsLayout>
  );
};

export default TermsOfService;
