import axios from "axios";
import { InquiriesListConfig } from "@/app/(route)/mypage/inquiries/_types/inquiries";

const getInquiriesList = async (data: InquiriesListConfig) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/inquiry`,
    {
      params: data,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getInquiriesList;
