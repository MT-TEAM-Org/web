import axios from "axios";

const getInquiriesCommentList = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${id}`,
    {
      params: { page: 1, size: 10, type: "INQUIRY" },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getInquiriesCommentList;
