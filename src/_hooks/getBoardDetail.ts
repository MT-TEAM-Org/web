import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBoardDetail = async (boardId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board/${boardId}`
  );
  return response.data;
};

const useGetBoardDetail = (boardId: string) =>
  useQuery({
    queryKey: ["board", "detail", boardId],
    queryFn: () => getBoardDetail(boardId),
    enabled: !!boardId,
  });

export default useGetBoardDetail;
