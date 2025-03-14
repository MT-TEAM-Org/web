"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import { CommunityToolbar } from "../../_components/CommunityToolbar";
import PostItem from "../../_components/PostItem";

interface BoardParams {
  boardType: string;
}

const Board = ({ params }: { params: Promise<BoardParams> }) => {
  const unwrappedParams = use(params);
  const { boardType } = unwrappedParams;

  const validBoardTypes = ["esports", "football", "baseball"];
  const reservedPaths = [
    "news",
    "customer",
    "gameboard",
    "service-introduction",
    "main",
    "mypage",
    "sign",
  ];

  if (
    !validBoardTypes.includes(boardType) &&
    !reservedPaths.includes(boardType)
  ) {
    return notFound();
  }

  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-[720px] w-full min-h-[120px] rounded-[5px] bg-[#FFFFFF] mx-auto relative">
        <div className="flex flex-col ">
          <div className="w-full sticky top-[140px] bg-white z-10">
            <CommunityToolbar boardType={boardType} />
          </div>
          <div className="w-full border-t flex justify-center items-center">
            <PostItem boardType={boardType} categoryType="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
