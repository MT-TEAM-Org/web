import { newsListConfig } from "@/app/(route)/news/_types/newsListConfig";
import axios from "axios";

const getSortedNewsDataList = async (data: newsListConfig) => {
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/news?${queryString}`)
  return response.data.data.list;
};

export default getSortedNewsDataList;