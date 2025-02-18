import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetBoardData {
  boardType: string;
  categoryType?: string;
  orderType?: string;
  page?: number;
  size?: number;
}

const getBoardData = async (data: GetBoardData) => {
  const { boardType, categoryType, orderType, page = 1, size = 15 } = data;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        boardType,
        categoryType,
        orderType,
        page,
        size,
      },
    }
  );

  return response.data;
};

const useGetBoardData = (data: GetBoardData) =>
  useQuery({
    queryFn: () => getBoardData(data),
    queryKey: ["board", data],
    retry: 1,
    enabled: !!data.boardType,
    select: (data) => data.data.list.content,
  });

export default useGetBoardData;
