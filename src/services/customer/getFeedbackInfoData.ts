import axios from "axios";

interface getFeedbackInfoDataProps {
  id: string | string[];
  openGraph?: boolean;
}

const getFeedbackInfoData = async ({ id, openGraph }: getFeedbackInfoDataProps) => {
  const accessToken = (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '');

  const url = `${process.env.NEXT_PUBLIC_API_URL}api/improvement/${id}${openGraph ? "?openGraph=true" : ""}`;

  const response = await axios.get(url, { 
    headers: {
      Authorization: accessToken ? `${accessToken}` : '',
    }
  });

  return response.data.data;
};

export default getFeedbackInfoData;