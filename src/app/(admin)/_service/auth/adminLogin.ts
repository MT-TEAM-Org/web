import axios from "axios";

interface Login {
  username: string;
  password: string;
}

const login = async (data: Login) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/admin/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export default login;
