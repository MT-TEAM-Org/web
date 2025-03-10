import axios from "axios";

interface InquiryData {
  page: number;
  size: number;
  orderType: "ANSWERED";
  searchType: "CONTENT" | "COMMENT";
  search: string;
}

const getInquiriesList = async (data: InquiryData) => {
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
