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

  if (isLoading) {
    return <div>로딩중...</div>;
  }

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
    <div className="w-[720px]">
      <h1>{boardDetailData?.data?.title}</h1>
      <div className="content">{parse(content, options)}</div>
    </div>
  );
};
export default BoardDetail;
