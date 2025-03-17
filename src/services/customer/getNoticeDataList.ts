import axios from "axios";

const getNoticeDataList = async (pageNum: number, searchType?: string, search?: string) => {
  const params: Record<string, any> = {
    page: 1 || pageNum,
    size: 20,
  };

  if (searchType) params.searchType = searchType;
  if (search) params.search = search;

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/notice`, { params });

  return response.data.data.list;
};

export default getNoticeDataList;