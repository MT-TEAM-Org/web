import axios from "axios";

interface NewsDataProps {
  page?: string;
  startIndex?: number;
}

const fetchNewsDataList = async ({
  page = "1",
  startIndex = 0,
}: NewsDataProps = {}) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/news`, {
    params: {
      category: "",
      orderType: "DATE",
      page: "1",
      size: 20,
    },
  });

  return response.data.data.list.content.slice(startIndex, startIndex + 5);
};

export default fetchNewsDataList;
