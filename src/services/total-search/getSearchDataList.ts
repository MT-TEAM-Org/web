import { searchListConfig } from "@/app/(route)/total-search/_types/searchListConfig";
import axios from "axios";

const getSearchDataList = async (data: searchListConfig) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();
  
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/home/search?${queryString}`, {
    headers: {
      Authorization: accessToken ? `${accessToken}` : '',
    },
  });

  return response.data.data.list;
};

export default getSearchDataList