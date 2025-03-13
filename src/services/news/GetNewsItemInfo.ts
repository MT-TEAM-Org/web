import axios from "axios";

const getNewsItemInfo = async ({ id }: { id: string }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news/${id}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data?.data;
};

export default getNewsItemInfo;