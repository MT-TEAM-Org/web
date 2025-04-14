import { Skeleton } from "@heroui/react";

const MainBigSizeNewsSkeleton = () => {
  return (
    <div className="relative w-[410px] h-[236px] rounded-[10px] overflow-hidden cursor-pointer">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[410px] h-[236px] rounded-[10px]" />
    </div>
  );
};

export default MainBigSizeNewsSkeleton;
