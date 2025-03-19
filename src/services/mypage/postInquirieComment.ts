import axios from "axios";

interface PostInquirieComment {
  id: string;
  comment: string;
  imageUrl: string;
}

const postInquirieComment = async (data: PostInquirieComment) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/inquiry/${data.id}/comment`,
    {
      comment: data.comment,
      imageUrl: data.imageUrl,
    },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default postInquirieComment;
