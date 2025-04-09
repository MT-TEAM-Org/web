"use client";

import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";
import {
  getKoreanBoardType,
  getKoreanCategoryType,
} from "@/utils/boardType/boardTypeKorean";
import { numberOverThousand } from "@/utils/boardType/numberOfThousand";
import DefaultThumbnail from "@/app/_components/icon/DefaultThumbnail";

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
  const postsData = boardData?.content;

  const maskIP = (ip: string) => {
    if (!ip) return "";

    const parts = ip.split(".");
    if (parts.length !== 4) return ip;

    return `${parts[0]}.${parts[1]}.**.**`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {postsData?.map((data: BoardListItem, index: number) => (
        <Link
          href={`/board/${boardType}/${data.categoryType}/${data.id}`}
          key={`${data.id}-${index}`}
          className="flex items-center w-[720px] min-h-[66px] gap-[12px] border-b px-[12px] border-gray1"
        >
          <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
            <span className="font-bold text-[14px] leading-[20px]">
              {numberOverThousand(data?.id)}
            </span>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[56px] h-[42px] relative box-content">
              {data?.thumbnail ? (
                <Image
                  src={data.thumbnail}
                  alt="post-preview-image"
                  fill
                  className="object-contain rounded-[5px]"
                />
              ) : (
                <div className="w-full h-full rounded-[5px] bg-[#FAFAFA] flex items-center justify-center">
                  <DefaultThumbnail />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
            <div className="flex items-center gap-[2px]">
              <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                {data?.title}
              </h2>
              {data?.commentCount > 0 && (
                <p className="text-Primary font-medium text-[12px] leading-[18px]">
                  [{data?.commentCount}]
                </p>
              )}

              <span className="font-black text-[10px] leading-[18px] text-primary">
                N
              </span>
              <span className="font-black text-[10px] leading-[18px] text-[#DC2800]">
                H
              </span>
            </div>

            <div className="flex font-semibold gap-1 items-center">
              <p className="text-[12px] leading-[18px] text-gray5">
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
              <span className="font-medium text-[12px] leading-[18px] text-gray4">
                IP {maskIP(data?.createdIp)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostItem;
