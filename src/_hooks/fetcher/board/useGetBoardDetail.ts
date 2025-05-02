import getBoardDetail from "@/services/board/getBoardDetail";
import { useQuery } from "@tanstack/react-query";

const useGetBoardDetail = (boardId: string) => {
  return useQuery({
    queryKey: ["board", "detail", boardId],
    queryFn: () => getBoardDetail(boardId, false),
    enabled: !!boardId,
  });
};

export default useGetBoardDetail;
