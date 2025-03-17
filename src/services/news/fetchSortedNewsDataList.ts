import { NewsDataParams } from "@/app/_constants/newsDataParams";
import axios from "axios";

const fetchSortedNewsDataList = async ({
  category,
  orderType,
  page,
  timePeriod,
  searchType,
}: NewsDataParams) => {
  const baseParams = {
    category,
    orderType,
    timePeriod,
    page,
    size: 10,
  };

  const params = searchType
    ? { ...baseParams, content: searchType }
    : baseParams;

  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params,
  });
  return response.data.data.list;
};

export default fetchSortedNewsDataList;