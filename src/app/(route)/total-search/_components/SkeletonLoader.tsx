import NoticeItemSkeleton from "../../customer/notice/_components/status/NoticeItemSkeleton";
import NewsPostItemSkeleton from "../../news/_components/NewsPostItemSkeleton";

interface SkeletonLoaderProps {
  isLoading: boolean;
  searchType: string;
  count?: number;
}

const SkeletonLoader = ({
  isLoading,
  searchType,
  count = 10,
}: SkeletonLoaderProps) => {
  if (!isLoading) return null;

  const SkeletonComponent =
    searchType === "news" ? NewsPostItemSkeleton : NoticeItemSkeleton;

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonComponent key={index} />
        ))}
    </>
  );
};

export default SkeletonLoader;
