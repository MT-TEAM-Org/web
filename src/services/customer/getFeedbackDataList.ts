import { feedbackListConfig } from "@/app/(route)/customer/_types/feedbackListConfig";
import axios from "axios";

interface getFeedbackDataListProps {
  pageNum: number;
  order: string;
  searchType?: string;
  search?: string;
}

const getFeedbackDataList = async (data: feedbackListConfig) => {
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/improvement?${queryString}`);

  return response.data.data.list;
};

export default getFeedbackDataList;