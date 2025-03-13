import axios from "axios";

const getBoardDetail = async (boardId: string) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board/${boardId}`,
    token ? { headers: { Authorization: `${token}` } } : {}
  );
  return response.data;
};

export default getBoardDetail;
