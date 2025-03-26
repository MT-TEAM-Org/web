import axios from "axios";

interface PostInquirieComment {
  type: "BOARD" | "IMPROVEMENT" | "INQUIRY" | "NEWS" | "NOTICE";
  id: string;
  comment: string;
  imageUrl: string;
  mentionedPublicId: string;
  parentId: number;
}

const postComment = async (data: PostInquirieComment) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/comments/${data.id}/comment`,
    {
      type: data.type,
      comment: data.comment,
      imageUrl: data.imageUrl,
      parentId: data.parentId,
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

export default postComment;
