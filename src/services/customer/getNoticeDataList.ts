import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";
import axios from "axios";

const getNoticeDataList = async (data: noticeListConfig) => {
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/notice?${queryString}`);

  return response.data.data.list;
};

export default getNoticeDataList;