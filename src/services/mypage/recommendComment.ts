import axios from "axios";

const recommendComment = async (commentId: number) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/recommend/${commentId}`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default recommendComment;
