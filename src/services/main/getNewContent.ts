import axios from "axios";

export type GetNewContentItem = {
  boardType: string;
  categoryType: string;
  id: number;
  title: string;
  commentCount: number;
  isHot: boolean;
  isImage: boolean;
};

const getNewContent = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/home/new`
  );
  return response;
};

export default getNewContent;
