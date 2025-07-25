import React from "react";
import TermsLayout from "../../_components/common/TermsLayout";
import TermsPersonalText from "@/app/_components/termsModal/TermsPersonalText";

export const metadata = {
  title: "Playhive - 개인정보 취급방침 페이지",
  description: "Playhive 개인정보 취급방침 페이지입니다.",
  openGraph: {
    title: "Playhive - 개인정보 취급방침",
    description: "Playhive 개인정보 취급방침 페이지입니다.",
    images: [
      {
        url: "https://playhive.co.kr/Metadata.png",
        alt: "Playhive 미리보기 이미지",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = () => {
  return (
    <TermsLayout title="개인정보 취급방침">
      <TermsPersonalText />
    </TermsLayout>
  );
};

export default Page;
