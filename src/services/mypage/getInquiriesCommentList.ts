import axios from "axios";

const getInquiriesCommentList = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/inquiry/${id}/comment`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getInquiriesCommentList;
