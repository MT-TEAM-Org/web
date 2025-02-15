import axios from "axios";

export interface GetUploadData {
  contentType: string;
  fileName: string;
}

const getUpload = async (data: GetUploadData) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/upload`,
    {
      params: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export default getUpload;
