import { apiRequest } from "../instant";

interface postNoticeProps {
  title: string;
  content: string;
  imgUrl?: string;
}

const postNotice = async ({ title, content, imgUrl }: postNoticeProps) => {
  const response = await apiRequest.post(
    `api/notice`, 
    {
      title,
      content,
      imgUrl
    },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      },
    }
  );
  return response;
};

export default postNotice;