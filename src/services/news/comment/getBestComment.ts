import axios from "axios";

const getBestComment = async (id: string) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/comment/best/${id}`,
    {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    }
  );
  return response.data.data;
};

export default getBestComment;