import axios from "axios";

const adminLogout = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}logout`,
    {
      withCredentials: true,
    }
  );

  return response;
};

export default adminLogout;
