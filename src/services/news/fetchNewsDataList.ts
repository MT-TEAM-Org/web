import axios from "axios";

interface NewsDataProps {
  page?: string;
}

const fetchNewsDataList = async ({ page }: NewsDataProps = {}) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: "",
      orderType: "DATE",
      page: page || 1,
      size: 5,
    },
  });
  return response.data.data.list.content;
};

export default fetchNewsDataList;
