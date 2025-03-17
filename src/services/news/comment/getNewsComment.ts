import axios from "axios";

interface NewsCommentProps {
  id: string;
}

const getNewsComment = async ({ id }: NewsCommentProps) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/comment`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
      params: {
        page: 1,
        size: 20,
        newsId: id,
      },
    }
  );
  return response.data.data.list;
};

export default getNewsComment;