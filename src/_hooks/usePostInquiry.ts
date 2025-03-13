import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface PostInquiryData {
  content: string;
  memberPublicId: string;
}

const fetchPostInquiry = async (data: PostInquiryData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/inquiry`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

const usePostInquiry = () => {
  return useMutation({
    mutationFn: (data: PostInquiryData) => fetchPostInquiry(data),
  });
};

export default usePostInquiry;
