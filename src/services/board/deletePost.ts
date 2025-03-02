"use client";

import axios from "axios";

interface DeletePostData {
  boardId: string;
}

const deletePost = async ({ boardId }: DeletePostData) => {
  const response = await axios.delete(`/api/board/${boardId}`);
  return response.data;
};

export default deletePost;
