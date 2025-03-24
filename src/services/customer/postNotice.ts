import { apiRequest } from "../instant";

interface postNoticeProps {
  title: string;
  content: string;
  imgUrl?: string;
  link?: string;
  thumbUrl?: string;
}

const postNotice = async ({ title, content, imgUrl, link, thumbUrl }: postNoticeProps) => {
  const response = await apiRequest.post(
    `api/notice`, 
    {
      title,
      content,
      imgUrl,
      link,
      thumbUrl
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