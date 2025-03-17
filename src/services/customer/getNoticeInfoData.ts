import axios from "axios";

interface getNoticeInfoDataProps {
  id: string
}

const getNoticeInfoData = async ({id}: getNoticeInfoDataProps) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/notice/${id}`)
  return response.data;
};

export default getNoticeInfoData;