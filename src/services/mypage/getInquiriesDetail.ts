import axios from "axios";

const getInquiriesDetail = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export default getInquiriesDetail;
