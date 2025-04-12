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
}

const PostItem = ({ boardType, categoryType, boardData }: PostItemProps) => {
  const [readPosts, setReadPosts] = useState<number[]>([]);

  const postsData = boardData?.content;

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

  return (
    <div className="w-full flex flex-col items-center">
      {postsData?.map((data: BoardListItem, index: number) => (
        <Link
          href={`/board/${boardType}/${data.categoryType}/${data.id}`}
          key={`${data.id}-${index}`}
          onClick={() => handlePostClick(data.id)}
          className={`flex items-center w-[720px] min-h-[66px] gap-[12px] border-b p-[12px]`}
        >
          <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
            <span>{numberOverThousand(data?.id)}</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className=" w-[56px] h-[42px] relative box-content">
              {data?.thumbnail ? (
                <Image
                  src={data.thumbnail}
                  alt="post-preview-image"
                  fill
                  className="object-contain rounded-[5px]"
                />
              ) : (
                <CustomIcon
                  icon="DEFAULT_THUMBNAIL_ICON"
                  className="w-[56px] h-[42px]"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
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
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                {data?.nickname}
              </span>
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                IP {data?.createdIp}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostItem;
