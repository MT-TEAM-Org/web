import axios from "axios";

const deleteImage = async (fileName: string) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}api/upload/delete`,
    {
      params: { fileName },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default deleteImage;
