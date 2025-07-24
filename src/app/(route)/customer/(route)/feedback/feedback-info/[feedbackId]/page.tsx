import React from "react";
import FeedbackInfo from "./_components/FeedbackInfo";
import { Metadata } from "next";
import getFeedbackInfoData from "@/services/customer/getFeedbackInfoData";

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

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

    const rawContent = feedbackDetail.content || "개선요청 상세 내용";
    const plainTextContent = stripHtml(rawContent || "").trim();

    const hasContent = plainTextContent.length > 0;

    return {
      title: feedbackDetail.title || "개선요청 상세 페이지",
      description: hasContent ? plainTextContent : undefined,
      openGraph: {
        title: feedbackDetail.title || "개선요청 상세 페이지",
        description: hasContent ? plainTextContent : undefined,
        images: !feedbackDetail.imgUrl
          ? [
              {
                url: "https://playhive.co.kr/Metadata.png",
                alt: "PlayHive 미리보기 이미지",
                width: 1200,
                height: 750,
              },
            ]
          : [{ url: feedbackDetail.imgUrl, width: 640, height: 315 }],
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
        images: [
          {
            url: "https://playhive.co.kr/Metadata.png",
            alt: "PlayHive 미리보기 이미지",
            width: 1200,
            height: 630,
          },
        ],
      },
      keywords: ["플레이하이브", "개선요청"],
    };
  }
}

const Page = () => {
  return <FeedbackInfo />;
};

export default Page;
