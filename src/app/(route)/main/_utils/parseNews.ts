import { NewsItemType } from "../../news/_types/newsItemType";
import { NewsListType } from "../../news/_types/newsListItemType";

interface parseNewsProps {
  newsData: NewsListType[] | { content: NewsListType[] };
  bigNewsData: NewsListType[] | { content: NewsListType[] };
  newsDataIsError: boolean;
  bigNewsDataIsError: boolean;
}

export function parseNews({
  newsData,
  bigNewsData,
  newsDataIsError,
  bigNewsDataIsError,
}: parseNewsProps): {
  newsItems: NewsItemType[];
  bigNewsItems: NewsItemType[];
  isValidNews: boolean;
  isError: boolean;
} {
  const newsItems = (
    Array.isArray(newsData) ? newsData : newsData?.content || []
  ) as NewsItemType[];
  const bigNewsItems = (
    Array.isArray(bigNewsData) ? bigNewsData : bigNewsData?.content || []
  ) as NewsItemType[];

  const isValidNews = bigNewsItems.length !== 0 && newsItems.length !== 0;
  const isError = bigNewsDataIsError || newsDataIsError;

  return {
    newsItems,
    bigNewsItems,
    isValidNews,
    isError,
  };
}
