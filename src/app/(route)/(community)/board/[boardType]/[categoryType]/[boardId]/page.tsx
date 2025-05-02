import { Metadata } from "next";
import { updateImageUrl } from "@/app/(route)/news/_utils/updatedImgUrl";
import getBoardDetail from "@/services/board/getBoardDetail";
import BoardDetailPage from "./_components/detailPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string; boardType: string; categoryType: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const boardDetail = await getBoardDetail(resolvedParams.boardId, true);
    const updatedImg = updateImageUrl(boardDetail?.thumnail, "w1200");

    return {
      title: boardDetail.title || "게시판 상세 페이지",
      description: boardDetail.content || "게시판 상세 내용",
      openGraph: {
        title: boardDetail.title || "게시판 상세 페이지",
        description: boardDetail.content || "게시판 상세 내용",
        images: !boardDetail.thumnail
          ? [
              {
                url: "https://playhive.co.kr/Metadata.png",
                alt: "PlayHive 미리보기 이미지",
                width: 1200,
                height: 630,
              },
            ]
          : [{ url: updatedImg, width: 1200, height: 630 }],
      },
      keywords: boardDetail.keywords || ["플레이하이브", "게시판"],
    };
  } catch (error) {
    return {
      title: "게시판 상세 페이지",
      description: "게시판 정보를 불러오는 중 오류가 발생했습니다.",
      openGraph: {
        title: "게시판 상세 페이지",
        description: "게시판 정보를 불러오는 중 오류가 발생했습니다.",
        images: [
          {
            url: "https://playhive.co.kr/Metadata.png",
            alt: "PlayHive 미리보기 이미지",
            width: 1200,
            height: 630,
          },
        ],
      },
      keywords: ["플레이하이브", "게시판"],
    };
  }
}

const Page = async ({
  params,
}: {
  params: Promise<{ boardId: string; boardType: string; categoryType: string }>;
}) => {
  const resolvedParams = await params;
  return (
    <BoardDetailPage
      boardId={resolvedParams.boardId}
      boardType={resolvedParams.boardType}
      categoryType={resolvedParams.categoryType}
    />
  );
};

export default Page;
