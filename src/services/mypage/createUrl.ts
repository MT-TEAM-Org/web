import axios from "axios";

const createUrl = async (url: string) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/upload`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  return response.data;
};

export default createUrl;
