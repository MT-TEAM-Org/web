import axios from "axios";

interface getFeedbackDataListProps {
  pageNum: number;
  order: string;
  searchType?: string;
  search?: string;
}

const getFeedbackDataList = async ({pageNum, order, searchType, search}: getFeedbackDataListProps) => {
  const params: Record<string, any> = {
    page: pageNum || 1,
    orderType: order || "CREATE",
    size: 20,
  };

  if (searchType) params.searchType = searchType;
  if (search) params.search = search;

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/improvement`, { params });

  return response.data.data.list;
};

export default getFeedbackDataList;