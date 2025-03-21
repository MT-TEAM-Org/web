import axios from "axios";

interface NewsDataProps {
  page?: string;
  startIndex?: number;
  size?: number;
  withPageInfo?: boolean;
}

const fetchNewsDataList = async ({
  page = "1",
  startIndex = 0,
  size = 5,
  withPageInfo = false,
}: NewsDataProps = {}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news`,
    {
      params: {
        category: "",
        orderType: "DATE",
        page,
        size: 20,
      },
    }
  );

  const list = response.data?.data?.list;

  if (withPageInfo) {
    return {
      content: list?.content?.slice(startIndex, startIndex + size) ?? [],
      pageInfo: list?.pageInfo ?? null,
    };
  }

  return list?.content?.slice(startIndex, startIndex + size) ?? [];
};

export default fetchNewsDataList;
