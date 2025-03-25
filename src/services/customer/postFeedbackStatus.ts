import { apiRequest } from "../instant";

interface postFeedbackStatusProps {
  id: number;
}

const postFeedbackStatus = async ({id}: postFeedbackStatusProps) => {
  const response = await apiRequest.post(
    `api/improvement/${id}`, 
  );
  return response;
};

export default postFeedbackStatus;