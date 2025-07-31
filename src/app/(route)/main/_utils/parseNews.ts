export function parseNews({
  newsData,
  bigNewsData,
  newsDataIsError,
  bigNewsDataIsError,
}: {
  newsData: any; // TODO: 타입수정
  bigNewsData: any;
  newsDataIsError: boolean;
  bigNewsDataIsError: boolean;
}) {
  const newsItems = Array.isArray(newsData)
    ? newsData
    : newsData?.content || [];

  const bigNewsItems = Array.isArray(bigNewsData)
    ? bigNewsData
    : bigNewsData?.content || [];

  const isValidNews = bigNewsItems.length !== 0 && newsItems.length !== 0;
  const isError = bigNewsDataIsError || newsDataIsError;

  return {
    newsItems,
    bigNewsItems,
    isValidNews,
    isError,
  };
}
