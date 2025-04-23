import axios from "axios";

const sendVerification = async (email: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/certification/send`,
    {
      email,
    }
  );
  return response.data;
};

export default sendVerification;
