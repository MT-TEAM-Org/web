import axios from "axios";

const getBoardDetail = async (boardId: string, openGraph: boolean) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/board/${boardId}${
      openGraph ? "?openGraph=true" : ""
    }`
  );
  return response.data;
};

export default getBoardDetail;
