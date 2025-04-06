import axios from "axios";

const checkVerification = async (data: { email: string; code: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/certification/certify-code`,
    data
  );
  return response.data;
};

export default checkVerification;
