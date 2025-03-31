import axios from "axios";

interface getFeedbackInfoDataProps {
  id: number;
  token?: string;
}

const getFeedbackInfoData = async ({id, token}: getFeedbackInfoDataProps) => {
  const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem('accessToken') : "");

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/improvement/${id}`, { 
    headers: {
      Authorization: accessToken ? `${accessToken}` : '',
    }
  });

  return response.data.data;
};

export default getFeedbackInfoData;