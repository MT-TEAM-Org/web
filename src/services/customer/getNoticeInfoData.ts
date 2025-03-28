import axios from "axios";

interface getNoticeInfoDataProps {
  id: number;
  token?: string;
}

const getNoticeInfoData = async ({id, token}: getNoticeInfoDataProps) => {
  const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem('accessToken') : "");
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/notice/${id}`, {
    headers: {
      Authorization: accessToken ? `${accessToken}` : '',
    }
  })
  return response.data.data;
};

export default getNoticeInfoData;