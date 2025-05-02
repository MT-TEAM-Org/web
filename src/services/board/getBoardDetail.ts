import axios from "axios";

const getBoardDetail = async (boardId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board/${boardId}`
  );
  return response.data;
};

export default getBoardDetail;
