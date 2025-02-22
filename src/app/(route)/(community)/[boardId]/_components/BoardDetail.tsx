"use client";

import useGetBoardDetail from "@/_hooks/getBoardDetail";

//최신화 반영을 위한 임시 주석입니다.

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
