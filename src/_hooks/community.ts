import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommunityData } from "@/app/_constants/categories";

const postCommunitycontent = async (data: CommunityData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/board`,
    data,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const usePostCommunityContent = () => {
  return useMutation({
    mutationFn: (data: CommunityData) => postCommunitycontent(data),
  });
};

export default usePostCommunityContent;
