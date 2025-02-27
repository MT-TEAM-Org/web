"use client";

import React from "react";
import useGetBoardDetail from "@/_hooks/getBoardDetail";
import Image from "next/image";
import parse from "html-react-parser";
import { Spinner } from "@heroui/react";

interface BoardDetailProps {
  boardId: string;
}

const BoardDetail = ({ boardId }: BoardDetailProps) => {
  const { data: boardDetailData, isLoading } = useGetBoardDetail(boardId);

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
  const link = boardDetailData?.data?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(link);

  console.log("youtubeEmbedUrl", youtubeEmbedUrl);

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
      <div className="w-[672px]">
        {isLoading ? (
          <div className="py-4">
            <h1 className="font-bold text-[18px] leading-[28px] text-[#303030] opacity-50 animate-pulse">
              로딩 중...
            </h1>
            <hr />
          </div>
        ) : (
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-bold text-[18px] leading-[28px] text-[#303030] mb-[-8px]">
              {boardDetailData?.data?.title}
            </h1>
            <div className="flex justify-between gap-[8px] w-[672px] min-h-[20px] text-gray6">
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
                <span className="text-[14px] leading-[20px]">추천</span>
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
            <div className="w-full min-h-[32px] flex justify-end my-[8px]">
              <div className="max-w-[106px] h-[32px] flex gap-x-[8px] text-[14px] font-medium leading-[14px] text-gray7">
                <button className="w-[49px] h-[32px] rounded-[5px] border border-gray3 bg-white pt-[9px] py-[12px]">
                  수정
                </button>
                <button className="w-[49px] h-[32px] rounded-[5px] border border-gray3 bg-white pt-[9px] py-[12px]">
                  삭제
                </button>
              </div>
            </div>
            <hr />
          </div>
        )}
      </div>

      <div className="content flex flex-col gap-[12px] font-medium text-[16px] leading-[24px] text-gray7">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spinner className="w-10 h-10" />
          </div>
        ) : (
          <>
            {youtubeEmbedUrl && (
              <iframe
                width="100%"
                height="400"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mt-4"
              />
            )}
            {parse(content, options)}
          </>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
