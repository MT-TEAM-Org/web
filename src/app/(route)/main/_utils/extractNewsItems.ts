import { NewsItemType } from "../../news/_types/newsItemType";
import { NewsListType } from "../../news/_types/newsListItemType";

export function extractNewsItemsPair({
  newsData,
  bigNewsData,
}: {
  newsData: NewsListType[] | { content: NewsListType[] };
  bigNewsData: NewsListType[] | { content: NewsListType[] };
}) {
  const newsItems = (
    Array.isArray(newsData) ? newsData : newsData?.content || []
  ) as NewsItemType[];

  const bigNewsItems = (
    Array.isArray(bigNewsData) ? bigNewsData : bigNewsData?.content || []
  ) as NewsItemType[];

  return {
    newsItems,
    bigNewsItems,
  };
}
