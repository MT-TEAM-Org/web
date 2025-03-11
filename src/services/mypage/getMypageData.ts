import axios from "axios";

const getMyPageData = async () => {
  const response = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export default getMyPageData;
