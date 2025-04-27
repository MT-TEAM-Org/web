import axios from "axios";

const getNewsItemInfo = async ({ 
  id, 
  token,
  openGraph
}: { 
  id: string; 
  token?: string;
  openGraph?: boolean;
}) => {
  const accessToken = token || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '');
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/news/${id}${openGraph ? "?openGraph=true" : ""}`;

  const response = await axios.get(
    url,
    {
      headers: {
        Authorization: accessToken ? `${accessToken}` : '',
      },
    }
  );
  return response.data?.data;
};

export default getNewsItemInfo;