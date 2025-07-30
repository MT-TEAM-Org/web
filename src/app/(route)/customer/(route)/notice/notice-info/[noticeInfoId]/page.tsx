import { Metadata } from "next";
import NoticeInfo from "./_components/NoticeInfo";
import getNoticeInfoData from "@/services/customer/getNoticeInfoData";
import { createMetadata } from "@/lib/generateMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noticeInfoId: string | string[] }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const noticeDetail = await getNoticeInfoData({
      id: resolvedParams.noticeInfoId,
      openGraph: true,
    });

    return createMetadata({
      title: noticeDetail.title,
      content: noticeDetail.content,
      thumbUrl: noticeDetail.imgUrl,
      fallbackTitle: "공지사항 상세 페이지",
      fallbackDescription: "공지사항 상세 내용",
      keywords: noticeDetail.keywords || ["플레이하이브", "공지사항"],
      stripHtmlContent: true,
    });
  } catch {
    return createMetadata({
      title: null,
      content: null,
      thumbUrl: null,
      fallbackTitle: "공지사항 상세 페이지",
      fallbackDescription: "공지사항 정보를 불러오는 중 오류가 발생했습니다.",
      keywords: ["플레이하이브", "공지사항"],
      stripHtmlContent: true,
    });
  }
}

const Page = () => {
  return <NoticeInfo />;
};

export default Page;
