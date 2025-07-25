import React from "react";
import FeedbackInfo from "./_components/FeedbackInfo";
import { Metadata } from "next";
import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";
import { createMetadata } from "@/lib/generateMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feedbackId: string | string[] }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const feedbackDetail = await getFeedbackInfoData({
      id: resolvedParams.feedbackId,
      openGraph: true,
    });

    return createMetadata({
      title: feedbackDetail.title,
      content: feedbackDetail.content,
      thumbUrl: feedbackDetail.imgUrl,
      fallbackTitle: "개선요청 상세 페이지",
      fallbackDescription: "개선요청 상세 내용",
      keywords: feedbackDetail.keywords || ["플레이하이브", "개선요청"],
      stripHtmlContent: true,
    });
  } catch {
    return createMetadata({
      title: null,
      content: null,
      thumbUrl: null,
      fallbackTitle: "개선요청 상세 페이지",
      fallbackDescription: "개선요청 정보를 불러오는 중 오류가 발생했습니다.",
      keywords: ["플레이하이브", "개선요청"],
      stripHtmlContent: true,
    });
  }
}

const Page = () => {
  return <FeedbackInfo />;
};

export default Page;
