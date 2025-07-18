// components/NewsListSection.tsx
import React from "react";
import EmptyItem from "@/app/(route)/customer/_components/EmptyItem";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import NewsPostItem from "@/app/(route)/news/_components/NewsPostItem";
import NewsPostItemSkeleton from "@/app/(route)/news/_components/NewsPostItemSkeleton";
import { NewsListType } from "@/app/(route)/news/_types/newsListItemType";
import { cn } from "@/utils";

interface NewsListSectionProps {
  isLoading: boolean;
  newsListData: any;
  sliceNewsListData: NewsListType[];
  searchParams: URLSearchParams;
  onPageChange: (page: number) => void;
}

const NewsListSection = ({
  isLoading,
  newsListData,
  sliceNewsListData,
  searchParams,
  onPageChange,
}: NewsListSectionProps) => {
  // 뉴스 목록 렌더링
  const renderContent = () => {
    if (isLoading) {
      return Array(3)
        .fill(0)
        .map((_, index) => <NewsPostItemSkeleton key={index} />);
    }

    if (sliceNewsListData.length === 0) {
      return <EmptyItem title="뉴스가" />;
    }

    return sliceNewsListData.map((newsItem: NewsListType) => (
      <NewsPostItem
        key={newsItem?.id}
        newsItem={newsItem}
        searchType={searchParams.get("search_type")}
        searchString={searchParams.get("search")}
      />
    ));
  };

  return (
    <section
      className={cn(
        "w-full h-auto rounded-[5px] shadow-soft-md bg-white",
        "mobile:max-w-full"
      )}
      aria-label="뉴스 추천 목록"
    >
      <div
        className={cn(
          "w-[720px] h-auto rounded-b-[5px] shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
          "tablet:max-w-full tablet:w-auto",
          "mobile:w-full mobile:max-w-full"
        )}
      >
        {renderContent()}

        {newsListData?.pageInfo?.totalPage > 0 && (
          <nav
            className={cn(
              "hidden",
              "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
            )}
            aria-label="뉴스 추천 목록"
          >
            <Pagination
              pageInfo={newsListData?.pageInfo}
              onPageChangeAction={onPageChange}
            />
          </nav>
        )}
      </div>
    </section>
  );
};

export default NewsListSection;
