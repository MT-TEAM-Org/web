import axios from "axios";

interface NewsDataParams {
  category?: string;
  orderType?: "DATE" | "COMMENT" | "VIEW";
  pageNum?: number;
  timeType?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  searchType?: string;
}

const fetchSortedNewsDataList = async ({
  category,
  orderType,
  pageNum,
  timeType,
  searchType,
}: NewsDataParams) => {
  const baseParams = {
    category: category || "",
    orderType: orderType || "DATE",
    timePeriod: timeType || "DAILY",
    page: pageNum || 1,
    size: 10,
  };

  const params = searchType
    ? { ...baseParams, content: searchType }
    : baseParams;

  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params,
  });
  return response.data.data.list.content;
};

export default fetchSortedNewsDataList;