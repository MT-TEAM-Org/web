import axios from "axios";

const patchNewsRecommend = async ({ newsId }) => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}api/news/count/recommend/${newsId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );
    return response;
};

export default patchNewsRecommend;