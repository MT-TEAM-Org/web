import axios from "axios";
import { NewsDataProps } from "../../app/(route)/main/_types/NewsDataProps"

const fetchNewsDataList = async ({
  page = "1",
  size = 5,
  withPageInfo = false,
  timePeriod = "MONTHLY",
  category = "",
  orderType = "DATE",
  content,
  startIndex = 1,
}: NewsDataProps = {}) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news`,
    {
      params: {
        category,
        orderType,
        page,
        size,
        timePeriod,
        content,
        startIndex,
      },
    }
  );

  const list = response.data?.data?.list;

  if (withPageInfo) {
    return {
      content: list?.content ?? [],
      pageInfo: list?.pageInfo ?? null,
    };
  }

  return list?.content ?? [];
};

export default fetchNewsDataList;
