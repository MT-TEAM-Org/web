import axios from "axios";

interface Signup {
  email: string;
  password?: string;
  tel: string;
  nickname: string;
}

const signup = async (data: Signup) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/create`,
    data
  );
  return response;
};

export default signup;
