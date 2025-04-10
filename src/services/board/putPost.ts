import { apiRequest } from "../instant";

export interface EditBoardData {
  boardType: string;
  categoryType: string;
  boardId?: string;
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
