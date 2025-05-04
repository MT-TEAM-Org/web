import getBoardDetail from "@/services/board/getBoardDetail";
import { useQuery } from "@tanstack/react-query";

const useGetBoardDetail = (boardId: string) => {
  return useQuery({
    queryKey: ["board", "detail", boardId],
    queryFn: () => getBoardDetail(boardId),
    enabled: !!boardId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

export default useGetBoardDetail;
