import axios from "axios";
import { InquiriesListConfig } from "@/app/(route)/mypage/inquiries/_types/inquiries";

const getInquiriesList = async (data: InquiriesListConfig) => {
  const queryString = new URLSearchParams(
    data as unknown as Record<string, string>
  ).toString();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/inquiry?${queryString}`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getInquiriesList;
