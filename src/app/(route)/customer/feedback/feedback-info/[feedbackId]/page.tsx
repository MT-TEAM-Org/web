import React from "react";
import FeedbackInfo from "./_components/FeedbackInfo";
import { Metadata } from "next";
import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feedbackId: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const feedbackId = Number(resolvedParams.feedbackId);
    const feedbackDetail = await getFeedbackInfoData({
      id: feedbackId,
    });

    return {
      title: feedbackDetail.title || "개선요청 상세 페이지",
      description: feedbackDetail.content || "개선요청 상세 내용",
      openGraph: {
        title: feedbackDetail.title || "개선요청 상세 페이지",
        description: feedbackDetail.content || "개선요청 상세 내용",
        images: feedbackDetail.imgUrl
          ? [{ url: feedbackDetail.imgUrl, width: 640, height: 315 }]
          : [{ url: "/Metadata.png", width: 1200, height: 630 }],
      },
      keywords: feedbackDetail.keywords || ["플레이하이브", "개선요청"],
    };
  } catch (error) {
    return {
      title: "개선요청 상세 페이지",
      description: "개선요청 정보를 불러오는 중 오류가 발생했습니다.",
      openGraph: {
        title: "개선요청 상세 페이지",
        description: "개선요청 정보를 불러오는 중 오류가 발생했습니다.",
        images: [{ url: "/Metadata.png" }],
      },
      keywords: ["플레이하이브", "개선요청"],
    };
  }
}

const Page = () => {
  return <FeedbackInfo />;
};

export default Page;
