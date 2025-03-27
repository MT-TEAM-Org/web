import { Metadata } from "next";
import React from "react";
import getNewsItemInfo from "@/services/news/GetNewsItemInfo";
import NewsInfo from "./_components/NewsInfo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; newsCategoryType: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const newsDetail = await getNewsItemInfo({ id: resolvedParams.id });
    console.log(newsDetail?.thumbImg);
    return {
      title: newsDetail.title || "뉴스 상세 페이지",
      description: newsDetail.content || "뉴스 상세 내용",
      openGraph: {
        title: newsDetail.title || "뉴스 상세 페이지",
        description: newsDetail.content || "뉴스 상세 내용",
        images: newsDetail.thumbImg
          ? [{ url: newsDetail.thumbImg, width: 1200, height: 630 }]
          : [{ url: "/Empty_news.png", width: 1200, height: 630 }],
      },
      keywords: newsDetail.keywords || ["플레이하이브", "뉴스"],
    };
  } catch (error) {
    return {
      title: "뉴스 상세 페이지",
      description: "뉴스 정보를 불러오는 중 오류가 발생했습니다.",
      openGraph: {
        title: "뉴스 상세 페이지",
        description: "뉴스 정보를 불러오는 중 오류가 발생했습니다.",
        images: [{ url: "/Empty_news.png" }],
      },
      keywords: ["플레이하이브", "뉴스"],
    };
  }
}

const Page = ({
  params,
}: {
  params: Promise<{ newsCategoryType: string; id: string }>;
}) => {
  return <NewsInfo params={params} />;
};

export default Page;
