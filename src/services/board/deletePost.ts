import { apiRequest } from "../instant";

type DeletePostData = {
  boardId: string;
};
const deletePost = async ({ boardId }: DeletePostData) => {
  const response = await apiRequest.delete(`api/board/${boardId}`);
  return response;
};

export default deletePost;

export type { DeletePostData };
