import React from "react";
import FeedbackInfo from "./_components/FeedbackInfo";
import { Metadata } from "next";
import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const feedbackDetail = await getFeedbackInfoData({ id: resolvedParams.id });

    return {
      title: feedbackDetail.title || "개선요청 상세 페이지",
      description: feedbackDetail.content || "개선요청 상세 내용",
      openGraph: {
        title: feedbackDetail.title || "개선요청 상세 페이지",
        description: feedbackDetail.content || "개선요청 상세 내용",
        images: feedbackDetail.imgUrl && [
          { url: feedbackDetail.imgUrl, width: 1200, height: 630 },
        ],
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
        images: [{ url: "/Empty_news.png" }],
      },
      keywords: ["플레이하이브", "개선요청"],
    };
  }
}

const Page = () => {
  return <FeedbackInfo />;
};

export default Page;
