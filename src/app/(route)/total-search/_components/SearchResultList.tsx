import React from "react";
import NewsPostItem from "../../news/_components/NewsPostItem";
import SearchEmptyBox from "./SearchEmptyBox";
import TotalSearchItem from "./TotalSearchItem";
import SkeletonLoader from "./SkeletonLoader";

interface SearchResultListProps {
  searchType: string;
  searchData: any;
  searchParams: URLSearchParams;
  fetchStatus: {
    isLoading: boolean;
    isError: boolean;
  };
}
const SearchResultList = ({
  searchType,
  searchData,
  searchParams,
  fetchStatus,
}: SearchResultListProps) => {
  if (["news", "board"].includes(searchType)) {
    if (searchData?.content?.length === 0 || fetchStatus.isError) {
      return <SearchEmptyBox />;
    }

    return (
      <>
        {fetchStatus.isLoading && (
          <SkeletonLoader
            isLoading={fetchStatus.isLoading}
            searchType={searchType}
          />
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
            />
          )
        )}
      </>
    );
  }
};

export default React.memo(SearchResultList);
