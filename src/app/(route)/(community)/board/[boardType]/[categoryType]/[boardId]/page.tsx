import { use } from "react";
import BoardDetail from "./_components/boardDetail";

interface BoardDetailProps {
  boardType: string;
  categoryType: string;
  boardId: string;
}

const BoardDetailPage = ({ params }: { params: Promise<BoardDetailProps> }) => {
  const unwrappedParams = use(params);
  const { boardId } = unwrappedParams;

  return (
    <div>
      <BoardDetail boardId={boardId} />
    </div>
  );
};

export default BoardDetailPage;
