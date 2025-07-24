"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { Spinner, user } from "@heroui/react";
import useAuthCheck from "@/_hooks/useAuthCheck";
import useDeletePost from "@/_hooks/fetcher/board/useDeletePost";
import { useEditStore } from "@/utils/Store";
import { usePathname, useRouter } from "next/navigation";
import PostAction from "@/app/(route)/(community)/_components/PostAction";
import usePostRecommend from "@/_hooks/fetcher/board/usePostRecommend";
import useDeleteRecommendPost from "@/_hooks/fetcher/board/useDeleteRecommnedPost";
import useGetBoardDetail from "@/_hooks/fetcher/board/useGetBoardDetail";
import {
  getKoreanBoardType,
  getKoreanCategoryType,
} from "@/utils/boardType/boardTypeKorean";
import { useRef, useState } from "react";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import { CommentItem } from "@/_types/comment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { cn } from "@/utils";
import useTimeAgo from "@/utils/useTimeAgo";
import RecommendButton from "@/app/(route)/(community)/_components/RecommendButton";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";
import DetailTitleSkeleton from "@/app/(route)/(community)/_components/DetailTitleSkeleton";
import { cleanContent } from "@/utils/secure/sanitize";

interface BoardDetailProps {
  boardId: string;
}

const BoardDetail = ({ boardId }: BoardDetailProps) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const router = useRouter();
  const { setEditMode, setBoardId, setBoardData } = useEditStore();
  const { data: boardDetailData, isLoading } = useGetBoardDetail(boardId);
  const { data: userData } = useAuthCheck();
  const { mutate: mutateDeletePost } = useDeletePost(boardId);
  const { mutate: mutatePostRecommend } = usePostRecommend({ boardId });
  const { mutate: mutateDeleteRecommend } = useDeleteRecommendPost({ boardId });
  const comments = useRef(null);
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );
  const pathname = usePathname();
  const formattedTime = useTimeAgo(boardDetailData?.data?.createDate);

  const maskIP = (ip: string) => {
    if (!ip) return "";
    const parts = ip.split(".");
    if (parts.length !== 4) return ip;
    return `${parts[0]}.${parts[1]}.**.**`;
  };

  const handleDeletePost = () => {
    mutateDeletePost();
  };

  const handleEditClick = () => {
    setEditMode(true);
    setBoardId(boardId);
    const editableData = {
      categoryType: boardDetailData?.data?.categoryType,
      content: boardDetailData?.data?.content,
      title: boardDetailData?.data?.title,
      link: boardDetailData?.data?.link || "",
    };
    setBoardData(editableData);

    const routeBoardType = boardDetailData?.data?.boardType.toLowerCase();
    const pathname = window.location.pathname;
    const rootPath = pathname.split("/")[1];
    router.push(
      `/${rootPath}/${routeBoardType}/${editableData?.categoryType}/write?edit=true`
    );
  };

  const handleRecommend = () => {
    mutatePostRecommend({ boardId });
  };

  const handleDeleteRecommend = () => {
    mutateDeleteRecommend({ boardId });
  };

  const checkRecommend = () => {
    if (notloginRecommend()) {
      return;
    }

    if (boardDetailData?.data?.isRecommended) {
      handleDeleteRecommend();
    } else {
      handleRecommend();
    }
  };

  const notloginRecommend = () => {
    if (!userData?.data) {
      setIsSignInModalOpen(true);
      return true;
    }
    return false;
  };

  const isEditable =
    userData?.data?.data?.publicId === boardDetailData?.data?.publicId;

  const content = boardDetailData?.data?.content || "";

  const link = boardDetailData?.data?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(link);

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const src = domNode.attribs?.src || "";
        if (src.includes("52.79.222.87")) {
          return (
            <Image
              src={cleanContent(src)}
              alt="게시글 이미지"
              width={800}
              height={600}
              className="max-w-full h-auto mx-auto block"
              onError={() => console.error("Image failed to load")}
            />
          );
        }
      }
      return domNode;
    },
  };

  const onHandleToTop = () => {
    if (comments.current) {
      const navBarHeight = 130; // 네비게이션 바 높이
      const y =
        comments.current.getBoundingClientRect().top +
        window.scrollY -
        navBarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-[16px] w-full pc:min-w-[720px] tablet:w-full tablet:max-w-[688px] rounded-5px border-b p-[24px] bg-white shadow-[0_0_10px_0_#0000000D]",
          "mobile:w-full mobile:max-w-[768px] mobile:gap-y-[12px] mobile:shadow-none mobile:py-[12px] mobile:px-[16px]"
        )}
      >
        <div className="w-full max-w-[672px] mobile:w-full mobile:max-w-[768px]">
          {isLoading ? (
            <div>
              <DetailTitleSkeleton />
              <hr />
            </div>
          ) : (
            <div className="flex flex-col gap-y-[8px] mobile:gap-y-[4px] text-gray6 tablet:max-w-[640px]">
              <h1 className="font-bold text-[18px] leading-[28px] text-[#303030] mobile:text-[16px] mobile:leading-[24px]">
                {boardDetailData?.data?.title}
              </h1>
              <div className="flex gap-x-[16px] max-w-[672px] min-h-[20px] mobile:flex-col mobile:w-full ">
                <div className="flex gap-x-[4px] w-full h-[20px] mobile:text-[12px] mobile:leading-[18px] mobile:w-full">
                  <p className="font-bold ">
                    {getKoreanBoardType(boardDetailData?.data?.boardType)}
                  </p>
                  <p className="font-medium">
                    {getKoreanCategoryType(boardDetailData?.data?.categoryType)}
                  </p>
                  <p className="font-medium">{formattedTime}</p>
                  <div className="flex gap-x-[4px] font-medium">
                    <p className="font-bold">조회수</p>
                    <p> {boardDetailData?.data?.viewCount}</p>
                  </div>
                  <div className="flex gap-x-[4px] font-medium">
                    <p className="font-bold">댓글</p>
                    <p> {boardDetailData?.data?.commentCount}</p>
                  </div>
                  <div className="flex gap-x-[4px] font-medium">
                    <p className="font-bold">추천</p>
                    <p> {boardDetailData?.data?.recommendCount}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex justify-end w-[235px] h-[20px] whitespace-nowrap gap-x-[4px] font-medium text-[14px] leading-[20px]",
                    "mobile:justify-start mobile:mt-[4px] mobile:text-[12px] mobile:leading-[18px] mobile:h-[18px]"
                  )}
                >
                  <p>{boardDetailData?.data?.nickname}</p>
                  <p>IP {maskIP(boardDetailData?.data?.clientIp)}</p>
                </div>
              </div>
              {isEditable && (
                <div className="w-full min-h-[32px] flex justify-end my-[16px] mobile:mt-[4px] mobilr:mb-[12px]">
                  <div className="max-w-[106px] h-[32px] flex gap-x-[8px] text-[14px] font-medium leading-[14px] text-gray7 mobile:text-[12px] mobile:leading-[18px]">
                    <button
                      onClick={handleEditClick}
                      className="flex items-center justify-center w-[49px] h-[32px] rounded-[5px] border border-gray3 bg-white py-[9px] px-[12px] whitespace-nowrap mobile:py-[6px] mobile:px-[8px] mobile:w-[60px] mobile:h-[30px]"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePost}
                      className="flex items-center justify-center w-[49px] h-[32px] rounded-[5px] border border-gray3 bg-white py-[9px] px-[12px] whitespace-nowrap mobile:py-[6px] mobile:px-[8px] mobile:w-[60px] mobile:h-[30px]"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
              <hr className={isEditable ? "" : "mt-[16px] mobile:mt-[12px]"} />
            </div>
          )}
        </div>
        <div className="content flex flex-col gap-[12px] font-medium text-[16px] leading-[24px] text-gray7 mobile:text-[14px]">
          {isLoading ? (
            <div className="flex justify-center items-center w-full min-h-[400px]">
              <Spinner className="w-10 h-10" />
            </div>
          ) : (
            <>
              {youtubeEmbedUrl && (
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={cleanContent(youtubeEmbedUrl)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {parse(content, options)}
              {!youtubeEmbedUrl && (
                <div className="w-full max-w-[679px] min-h-[42px] mobile:hidden">
                  <div>{cleanContent(boardDetailData?.data?.link)}</div>
                </div>
              )}
            </>
          )}
        </div>
        <div
          onClick={notloginRecommend}
          className="w-full h-auto flex justify-center"
        >
          {isSignInModalOpen && (
            <SignInModalPopUp
              isOpen={isSignInModalOpen}
              onClose={() => setIsSignInModalOpen(false)}
            />
          )}
          <RecommendButton
            handleCommend={checkRecommend}
            recommendCount={boardDetailData?.data?.recommendCount}
            isRecommend={boardDetailData?.data?.isRecommended}
          />
        </div>
        <PostAction type="community" />
        <BoardComment
          ref={comments}
          id={boardId}
          publicId={boardDetailData?.data?.publicId}
          setParentsComment={setParentsComment}
          type="BOARD"
        />
        <PostNavigation
          nextId={boardDetailData?.data?.nextId}
          previousId={boardDetailData?.data?.previousId}
          scrollToCommentBar={onHandleToTop}
          currentPath={pathname}
        />
      </div>
      <div className="shadow-md sticky bottom-0 w-full">
        <SendCommentBox
          id={boardId}
          type="BOARD"
          parentsComment={parentsComment}
          setParentsComment={setParentsComment}
        />
      </div>
    </>
  );
};

export default BoardDetail;
