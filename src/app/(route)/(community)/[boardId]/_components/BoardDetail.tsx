"use client";

import useGetBoardDetail from "@/_hooks/getBoardDetail";
import Image from "next/image";
import { useState } from "react";
import parse from "html-react-parser";

interface BoardDetailProps {
  boardId: string;
}

const BoardDetail = ({ boardId }: BoardDetailProps) => {
  const { data: boardDetailData, isLoading } = useGetBoardDetail(boardId);
  const [imagError, setImageError] = useState(false);

  const boardTypeMap: { [key: string]: string } = {
    FOOTBALL: "축구",
    BASEBALL: "야구",
    ESPORTS: "E스포츠",
  };

  const categoryTypeMap: { [key: string]: string } = {
    FREE: "자유",
    QUESTION: "질문",
    ISSUE: "이슈",
    VERIFICATION: "리뷰",
    TIP: "플레이 팁",
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  const getKoreanBoardType = (type: string) => {
    return boardTypeMap[type] || type;
  };

  const getKoreanCategoryType = (type: string) => {
    return categoryTypeMap[type] || type;
  };

  const maskIP = (ip: string) => {
    if (!ip) return "";

    const parts = ip.split(".");
    if (parts.length !== 4) return ip;

    return `${parts[0]}.${parts[1]}.**.**`;
  };

  const content = boardDetailData?.data?.content || "";

  const options = {
    replace: (domNode) => {
      if (domNode.name === "img") {
        const src = domNode.attribs?.src || "";
        if (src.includes("52.79.222.87")) {
          return (
            <Image
              src={src}
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

  return (
    <div className="flex flex-col gap-[16px] w-[720px] rounded-5px border-b p-[24px] bg-white shadow-[0_0_10px_0_#0000000D]">
      <div className="w-[672px] border-b ">
        <h1 className="font-bold text-[18px] leading-[28px] text-[#303030]">
          {boardDetailData?.data?.title}
          <div className="py-2 flex justify-between gap-[16px] w-[672px] min-h-[20px] text-gray6">
            <div className="flex gap-[8px] w-[421px] h-[20px]">
              <span className="text-[14px] leading-[20px]">
                {getKoreanBoardType(boardDetailData?.data?.boardType)}
              </span>
              <span className="font-medium text-[14px] leading-[20px]">
                {getKoreanCategoryType(boardDetailData?.data?.categoryType)}
              </span>
              <span className="font-medium text-[14px] leading-[20px]">
                1분 전
              </span>
              <span className="text-[14px] leading-[20px]">조회수</span>
              <span className="font-medium text-[14px] leading-[20px]">
                {boardDetailData?.data?.viewCount}
              </span>
              <span className="text-[14px] leading-[20px]">댓글</span>
              <span className="font-medium text-[14px] leading-[20px]">
                {boardDetailData?.data?.commentCount}
              </span>
              <span className="text-[14px] leading-[20px]">조회수</span>
              <span className="font-medium text-[14px] leading-[20px]">
                {boardDetailData?.data?.recommendCount}
              </span>
            </div>
            <div className="flex justify-end gap-[12px] w-[235px] h-[20px]">
              <span className="font-medium text-[14px] leading-[20px]">
                {boardDetailData?.data?.nickname}
              </span>
              <span className="font-medium text-[14px] leading-[20px]">
                IP {maskIP(boardDetailData?.data?.clientIp)}
              </span>
            </div>
          </div>
        </h1>
      </div>
      <div className="content flex flex-col gap-[12px] font-medium text-[16px] leading-[24px] text-gray7">
        {parse(content, options)}
      </div>
    </div>
  );
};
export default BoardDetail;
