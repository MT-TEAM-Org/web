import NoticeItemSkeleton from "../../customer/_components/NoticeItemSkeleton";
import NewsPostItem from "../../news/_components/NewsPostItem";
import NewsPostItemSkeleton from "../../news/_components/NewsPostItemSkeleton";
import SearchEmptyBox from "./SearchEmptyBox";
import TotalSearchItem from "./TotalSearchItem";

interface SearchResultListProps {
  searchType: string;
  searchData: any;
  searchParams: any;
  isLoading: boolean;
  isError: boolean;
}

const SearchResultList = ({
  searchType,
  searchData,
  searchParams,
  isLoading,
  isError,
}: SearchResultListProps) => {
  if (["news", "board"].includes(searchType)) {
    if (searchData?.content?.length === 0 || isError) {
      return <SearchEmptyBox />;
    }

    return (
      <>
        {isLoading &&
          Array(10)
            .fill(0)
            .map((_, index) =>
              searchType === "news" ? (
                <NewsPostItemSkeleton key={index} />
              ) : searchType === "board" ? (
                <NoticeItemSkeleton key={index} />
              ) : null
            )}
        {searchData?.content?.map((item) =>
          searchType === "news" ? (
            <NewsPostItem
              key={item.id}
              newsItem={item}
              searchType={searchParams.get("searchType") || "TITLE_CONTENT"}
              searchString={searchParams.get("search") || ""}
            />
          ) : (
            <TotalSearchItem
              key={item.id}
              data={item}
              searchType={searchParams.get("searchType") || "TITLE_CONTENT"}
              searchString={searchParams.get("search") || ""}
              href={`/board/${item.boardType}/${item.categoryType}/${item.id}`}
            />
          )
        )}
      </>
    );
  }
};

export default SearchResultList;
