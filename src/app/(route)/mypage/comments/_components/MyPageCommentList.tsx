"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import MypagePostSkelton from "../../posts/_components/MypagePostSkelton";
import useGetMyCommentList from "@/_hooks/fetcher/mypage/useGetMyCommentList";
import { PostListConfig } from "../../posts/_types/postTypes";
import { useSearchParams } from "next/navigation";
import MyPageCommentItem from "./MyPageCommentItem";
import MobileBackButtonWrapper from "../../_components/MobileBackButton";
import { cn } from "@/utils";
import Pagination from "../../_components/Pagination";
import { useRouter } from "next/navigation";
import changeURLParams from "../../util/changeURLParams";
import CommentEmpty from "@/app/_components/_comment/CommentEmpty";
import useIsMobile from "@/utils/useIsMobile";

interface PostResponse {
  commentType: "BOARD";
  id: number;
  thumbnail: string;
  title: string;
  boardType: "BASEBALL";
  categoryType: "FREE";
  createdIp: string;
  publicId: string;
  nickname: string;
  commentCount: number;
  createDate: string; // ISO 8601 format
  lastModifiedDate: string; // ISO 8601 format
  isHot: boolean;
}

interface CommentResponse {
  commentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  commenterImg: string;
  imageUrl: string;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string; // ISO 8601 format
  lastModifiedDate: string; // ISO 8601 format
  replyList: string[];
  recommended: boolean;
  admin: boolean;
}

interface Response {
  postResponse: PostResponse;
  commentResponse: CommentResponse;
}

const MyPageCommentList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const postOptions: PostListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    orderType:
      (searchParams.get("order_type") as PostListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("search_type") as PostListConfig["searchType"]) ||
      "CONTENT",
    search: searchParams.get("search") || "",
    commentType: isMobile
      ? "ALL"
      : (searchParams.get("comment_type") as PostListConfig["commentType"]) ||
        "BOARD",
  };
  const { data, isLoading } = useGetMyCommentList(postOptions);
  const { content, pageInfo } = data?.data?.list || {};

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageInfo.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div>
      <MobileBackButtonWrapper mode="comments" />
      <MypageToolbar mode="comments" pageInfo={pageInfo} />
      <div
        className={cn(
          `flex flex-col w-full bg-[#FFFFFF] rounded-b-[5px] ${
            pageInfo?.totalElement !== 0 && "shadow-soft-md"
          }`,
          "mobile:shadow-none"
        )}
      >
        {pageInfo?.totalElement !== 0 ? (
          content?.map((post: Response) => (
            <MyPageCommentItem
              key={post.commentResponse.commentId}
              data={post}
            />
          ))
        ) : (
          <CommentEmpty isMypage />
        )}
        {isLoading && <MypagePostSkelton />}
        <div
          className={cn(
            "hidden",
            `mobile:block mobile:mt-[12px] mobile:mx-auto mobile:mb-[24px] mobile:${
              pageInfo?.totalElement === 0 ? "hidden" : "block"
            }`
          )}
        >
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPageCommentList;
