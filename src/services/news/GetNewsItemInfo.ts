import axios from "axios";

const getNewsItemInfo = async ({ 
  id, 
  token 
}: { 
  id: string; 
  token?: string;
}) => {
  const accessToken = token || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '');

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/${id}`,
    {
      headers: {
        Authorization: accessToken ? `${accessToken}` : '',
      },
    }
  );
  return response.data?.data;
};

export default getNewsItemInfo;