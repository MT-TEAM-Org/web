import { searchListConfig } from "@/app/(route)/total-search/_types/searchListConfig";
import axios from "axios";

const getSearchDataList = async (data: searchListConfig) => {
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(`/api/home/search?${queryString}`)
  return response.data.data.list;
};

export default getSearchDataList;