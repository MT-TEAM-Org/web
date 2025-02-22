"use client";

import useGetBoardDetail from "@/_hooks/getBoardDetail";

interface BoardDetailProps {
  boardId: string;
}

const BoardDetail = ({ boardId }: BoardDetailProps) => {
  const { data: boardDetailData, isLoading } = useGetBoardDetail(boardId);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h1>{boardDetailData?.data?.title}</h1>
      <div>{boardDetailData?.data?.content}</div>
    </div>
  );
};

export default BoardDetail;
