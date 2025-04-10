import axios from "axios";

const deleteAccount = async () => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}api/profile`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default deleteAccount;
