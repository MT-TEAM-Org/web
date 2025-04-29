import axios from "axios";

interface postFeedbackStatusProps {
  id: number;
  status: "PENDING" | "RECEIVED" | "COMPLETED"
}

const postFeedbackStatus = async ({id, status}: postFeedbackStatusProps) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/improvement/${id}?status=${status}`, 
    {},
    {
      headers: {
        Authorization: localStorage.getItem("accessToken")
      },
    }
  );
  return response;
};

export default postFeedbackStatus;