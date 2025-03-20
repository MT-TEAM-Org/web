import { apiRequest } from "../instant";

interface postFeedbackProps {
  title: string;
  content: string;
  imgUrl?: string;
}

const postFeedback = async ({ title, content, imgUrl }: postFeedbackProps) => {
  const response = await apiRequest.post(
    `api/improvement`, 
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

export default postFeedback;