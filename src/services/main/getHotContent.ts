import axios from "axios";

export type GetHotContentItem = {
  rank: number;
  boardType: string;
  categoryType: string;
  id: number;
  title: string;
  commentCount: number;
  isHot: boolean;
  isImage: boolean;
};

const getHotContent = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/home/hot`
  );
  return response.data;
};

export default getHotContent;
