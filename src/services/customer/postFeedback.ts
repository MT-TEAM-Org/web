import { apiRequest } from "../instant";

interface postFeedbackProps {
  title: string;
  content: string;
  imgUrl?: string;
  link?: string
  thumbUrl?: string;
}

const postFeedback = async ({ title, content, imgUrl, link, thumbUrl }: postFeedbackProps) => {
  const response = await apiRequest.post(
    `api/improvement`, 
    {
      title,
      content,
      imgUrl,
      link,
      thumbUrl,
    },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      },
    }
  );
  return response;
};

export default postFeedback;