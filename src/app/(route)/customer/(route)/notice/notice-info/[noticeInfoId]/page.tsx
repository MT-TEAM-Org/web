import { Metadata } from "next";
import NoticeInfo from "./_components/NoticeInfo";
import getNoticeInfoData from "@/services/customer/getNoticeInfoData";

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noticeInfoId: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const noticeId = Number(resolvedParams.noticeInfoId);
    const noticeDetail = await getNoticeInfoData({
      id: noticeId,
      openGraph: true,
    });

    const rawContent = noticeDetail.content || "공지사항 상세 내용";
    const plainTextContent = stripHtml(rawContent || "").trim();

    const hasContent = plainTextContent.length > 0;

    return {
      title: noticeDetail.title || "공지사항 상세 페이지",
      description: hasContent ? plainTextContent : undefined,
      openGraph: {
        title: noticeDetail.title || "공지사항 상세 페이지",
        description: hasContent ? plainTextContent : undefined,
        images: !noticeDetail.imgUrl
          ? [
              {
                url: "https://playhive.co.kr/Metadata.png",
                alt: "PlayHive 미리보기 이미지",
                width: 1200,
                height: 630,
              },
            ]
          : [{ url: noticeDetail.imgUrl, width: 600, height: 315 }],
      },
      keywords: noticeDetail.keywords || ["플레이하이브", "공지사항"],
    };
  } catch (error) {
    return {
      title: "공지사항 상세 페이지",
      description: "공지사항 정보를 불러오는 중 오류가 발생했습니다.",
      openGraph: {
        title: "공지사항 상세 페이지",
        description: "공지사항 정보를 불러오는 중 오류가 발생했습니다.",
        images: [
          {
            url: "https://playhive.co.kr/Metadata.png",
            alt: "PlayHive 미리보기 이미지",
            width: 1200,
            height: 630,
          },
        ],
      },
      keywords: ["플레이하이브", "공지사항"],
    };
  }
}

const Page = () => {
  return <NoticeInfo />;
};

export default Page;
