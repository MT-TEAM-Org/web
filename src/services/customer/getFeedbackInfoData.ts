import axios from "axios";

interface getFeedbackInfoDataProps {
  id: number
}

const getFeedbackInfoData = async ({id}: getFeedbackInfoDataProps) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/improvement/${id}`, { 
    
  });

  return response.data.data.list;
};

export default getFeedbackInfoData;