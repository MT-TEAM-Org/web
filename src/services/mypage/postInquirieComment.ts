import axios from "axios";

interface PostInquirieComment {
  id: string;
  comment: string;
  imageUrl: string;
  mentionedPublicId: string;
}

const postInquirieComment = async (data: PostInquirieComment) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${data.id}/comment`,
    {
      type: "INQUIRY",
      comment: data.comment,
      imageUrl: data.imageUrl,
      parentId: null,
      mentionedPublicId: data.mentionedPublicId,
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
