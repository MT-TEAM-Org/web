"use client";

import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";
import {
  getKoreanBoardType,
  getKoreanCategoryType,
} from "@/utils/boardType/boardTypeKorean";
import { numberOverThousand } from "@/utils/boardType/numberOfThousand";

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
          className="flex items-center w-[720px] min-h-[66px] gap-[12px] border-b px-[12px] py-[14.6px]"
        >
          {/* 번호 */}
          <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
            <span className="font-bold text-[14px]">
              {numberOverThousand(data?.id)}
            </span>
          </div>

          {/* 공지 이미지 썸네일 여백 추가 */}
          <div className="w-[56px] h-[42px] relative p-[14.6px] px-[4.15px] box-content">
            <Image
              src={data?.thumbnail || "/Preview_loading_image.png"}
              alt="post-preview-image"
              fill
              className="object-contain rounded-[5px]"
              blurDataURL="/Preview_loading_image.png"
            />
          </div>

          {/* 게시글 정보 */}
          <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
            <div className="flex items-center gap-[2px]">
              {/* 제목 - font-medium + 자간 -2% */}
              <h2 className="text-[14px] leading-[20px] text-gray7 font-medium tracking-[-0.02em] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {data?.title}
              </h2>

              {/* 댓글 - 0개는 표시 안 함, 색상 변경 */}
              {data?.commentCount > 0 && (
                <p className="text-[#00ADEE] font-medium text-[12px] leading-[18px]">
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
              {/* IP 색상만 변경 */}
              <span className="font-medium text-[12px] leading-[18px] text-[#CBCBCB]">
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
