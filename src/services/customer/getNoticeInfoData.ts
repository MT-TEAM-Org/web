import axios from "axios";

interface getNoticeInfoDataProps {
  id: string | string[];
  openGraph?: boolean;
}

const getNoticeInfoData = async ({id, openGraph}: getNoticeInfoDataProps) => {
  const accessToken = (typeof window !== "undefined" ? localStorage.getItem('accessToken') : "");
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/notice/${id}${openGraph ? "?openGraph=true" : ""}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: accessToken ? `${accessToken}` : '',
    }
  })
  return response.data.data;
};

export default getNoticeInfoData;