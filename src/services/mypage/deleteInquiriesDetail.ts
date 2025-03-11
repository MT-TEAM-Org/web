import axios from "axios";

const deleteInquiriesDetail = async (id: string) => {
  const response = await axios.delete(
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

export default deleteInquiriesDetail;
