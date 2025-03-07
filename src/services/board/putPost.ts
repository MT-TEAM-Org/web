import axios from "axios";
import { apiRequest } from "../instant";

interface EditBoardData {
  boardType: string;
  categoryType: string;
  content?: string;
  title: string;
  link?: string;
  thumbnail?: string;
}

const putPost = async (data: EditBoardData, boardId: string) => {
  const response = await apiRequest.put(
    `${process.env.NEXT_PUBLIC_API_URL}api/board/${boardId}`,
    data,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export default putPost;

export type { EditBoardData };
