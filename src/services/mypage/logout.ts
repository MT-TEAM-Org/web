import axios from "axios";

const logout = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}logout`,
    {
      withCredentials: true,
    }
  );

  return response;
};

export default logout;
