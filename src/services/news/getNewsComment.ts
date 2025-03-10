import axios from "axios";

interface NewsCOmmentProps {
  newsId: string;
}

const getNewsComment = async ({ newsId }: NewsCOmmentProps) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/comment`, {
      headers: {
        Authorization: token ? `${token}` : "",
      },
      params: {
        page: 1,
        size: 10,
        newsId,
      },
    }
  );
  return response.data.data.list;
};

export default getNewsComment;