import { NewsItemType } from "../../news/_types/newsItemType";

export function getNewsStatus({
  newsItems,
  bigNewsItems,
  newsDataIsError,
  bigNewsDataIsError,
}: {
  newsItems: NewsItemType[];
  bigNewsItems: NewsItemType[];
  newsDataIsError: boolean;
  bigNewsDataIsError: boolean;
}): {
  isValidNews: boolean;
  isError: boolean;
} {
  const isValidNews = bigNewsItems.length !== 0 && newsItems.length !== 0;
  const isError = bigNewsDataIsError || newsDataIsError;

  return { isValidNews, isError };
}
