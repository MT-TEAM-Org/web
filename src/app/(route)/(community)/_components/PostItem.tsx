"use client";

import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";
import {
  getKoreanBoardType,
  getKoreanCategoryType,
} from "@/utils/boardType/boardTypeKorean";
import { numberOverThousand } from "@/utils/boardType/numberOfThousand";
import { useEffect, useState } from "react";
import CustomIcon from "@/app/_components/IconComponents/Icon";
import EmptyBoard from "./emptyBoard";
import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import NoticeItem from "../../customer/_components/NoticeItem";
import { NoticeContentType } from "../../customer/_types/NoticeItemType";
import Pagination from "../../mypage/_components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PostItemSkeleton from "./PostItemSkelton";

interface BoardListItem {
  id: number;
  boardType: string;
  categoryType: string;
  title: string;
  createdIp: string;
  thumbnail: string;
  publicId: string;
  nickname: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

interface BoardData {
  content: BoardListItem[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
  noticeList?: any[];
}

interface PostItemProps {
  boardType: string;
  categoryType: string;
  boardData?: BoardData;
  pageInfo?: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
  isDetailPage: boolean;
  isLoading: boolean;
}

const PostItem = ({
  boardType,
  categoryType,
  boardData,
  pageInfo,
  isDetailPage,
  isLoading,
}: PostItemProps) => {
  const [readPosts, setReadPosts] = useState<number[]>([]);
  const { data: noticeResponse } = useGetNoticeDataList();

  const postsData = boardData?.content;
  const noticeData = noticeResponse?.content;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slicedNoticeDataList = (noticeData as NoticeContentType[])
    ?.sort((a, b) => b.id - a.id)
    .slice(0, 2);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedReadPosts = localStorage.getItem("readPosts");
        if (storedReadPosts) {
          setReadPosts(JSON.parse(storedReadPosts));
        }
      } catch (error) {
        console.error("LocalStorage parsing error:", error);
      }
    }
  }, []);

  const isPostRead = (postId: number) => {
    return readPosts.includes(postId);
  };

  const handlePostClick = (postId: number) => {
    if (!isPostRead(postId)) {
      const updatedReadPosts = [...readPosts, postId];
      setReadPosts(updatedReadPosts);

      try {
        localStorage.setItem("readPosts", JSON.stringify(updatedReadPosts));
      } catch (error) {
        console.error(
          "로컬 스토리지에 읽은 게시물을 저장하는 중 오류 발생:",
          error
        );
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (pageInfo && pageInfo.totalPage) {
      if (page < 1 || page > pageInfo.totalPage) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  if (isLoading) {
    return <PostItemSkeleton />;
  }

  return (
    <div
      className={`w-full tablet:max-w-[688px] flex flex-col items-center mobile:min-w-[360px] mobile:max-w-[768px] ${
        isDetailPage ? "tablet:mb-[40px]" : ""
      }`}
    >
      {slicedNoticeDataList?.map((noticeListData: NoticeContentType) => (
        <NoticeItem
          key={noticeListData.id}
          noticeData={noticeListData}
          isFeedback={true}
        />
      ))}
      {postsData && postsData.length > 0 ? (
        postsData.map((data: BoardListItem, index: number) => (
          <Link
            href={`/board/${boardType}/${data.categoryType}/${data.id}`}
            key={`${data.id}-${index}`}
            onClick={() => handlePostClick(data.id)}
            className="flex items-center w-full max-w-[720px] min-h-[66px] gap-[12px] border-b p-[12px]  hover:bg-bg0 mobile:max-w-[768px]"
          >
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] text-[14px] p-2 bg-gray1 font-bold text-gray7">
              <span>{numberOverThousand(data?.id)}</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="w-[56px] h-[42px] relative box-content">
                {data?.thumbnail ? (
                  <Image
                    src={data.thumbnail}
                    alt="post-preview-image"
                    fill
                    className="object-cover rounded-[5px]"
                  />
                ) : (
                  <CustomIcon
                    icon="DEFAULT_THUMBNAIL_ICON"
                    className="w-[56px] h-[42px]"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 gap-y-[4px]  mobile:whitespace-nowrap">
              <div className="flex items-center gap-[2px] max-w-[584px]">
                <h2
                  className={`text-[14px] leading-[20px] overflow-hidden whitespace-nowrap overflow-ellipsis  ${
                    isPostRead(data?.id) ? "text-gray5" : "text-gray7"
                  }`}
                >
                  {data?.title}
                </h2>
                {data?.commentCount > 0 && (
                  <p className="text-gra font-medium text-[12px] leading-[18px]">
                    [{data.commentCount}]
                  </p>
                )}
                <span className="font-black text-[10px] leading-[18px] text-gra">
                  N
                </span>
                <span className="font-black text-[10px] leading-[18px] text-[#DC2800]">
                  H
                </span>
              </div>
              <div className="flex font-semibold gap-1 items-center">
                <p className="text-[12px] leading-[18px] text-gray5 ">
                  {getKoreanBoardType(data?.boardType)}
                </p>
                <span className="font-medium text-[12px] leading-[18px] text-gray5">
                  {getKoreanCategoryType(data?.categoryType)}
                </span>
                <span className="font-medium text-[12px] leading-[18px] text-gray5">
                  {CalculateTime(data?.createdAt)}
                </span>
                <span className="font-medium text-[12px] leading-[18px] text-gray5 mobile:max-w-[32px] mobile:truncate mobile:overflow-hidden mobile:whitespace-nowrap">
                  {data?.nickname}
                </span>
                <span className="font-medium text-[12px] leading-[18px] text-gray4">
                  IP {data?.createdIp}
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <EmptyBoard />
      )}
      <div className="w-full hidden mobile:block mobile:mt-[12px] mobile:mb-[24px]">
        <div className="flex justify-center items-center">
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
