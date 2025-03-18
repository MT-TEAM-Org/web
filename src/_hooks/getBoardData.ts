import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetBoardData {
  boardType: string;
  categoryType?: string;
  orderType?: string;
  searchType?: string;
  search?: string;
  page?: number;
  size?: number;
}

const getBoardData = async (data: GetBoardData) => {
  const {
    boardType,
    categoryType,
    searchType,
    search,
    orderType,
    page = 1,
    size = 20,
  } = data;

  const checkCategory = categoryType === "ALL" ? null : categoryType;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        boardType,
        categoryType: checkCategory,
        orderType,
        searchType,
        search,
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
    queryKey: ["board", "list", data],
    retry: 1,
    enabled: !!data.boardType,
    select: (data) => ({
      content: data.data.list.content,
      pageInfo: data.data.list.pageInfo,
      noticeList: data.data.noticeList,
    }),
  });

export default useGetBoardData;
