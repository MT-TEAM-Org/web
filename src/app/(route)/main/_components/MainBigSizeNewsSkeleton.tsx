import { Skeleton } from "@heroui/react";

const MainBigSizeNewsSkeleton = () => {
  return (
    <div className="relative w-[410px] h-[236px] rounded-[10px] overflow-hidden cursor-pointer">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[410px] h-[236px] rounded-[10px]" />

      {/* 제목 및 내용 영역 */}
      <div className="absolute top-[128px] w-[410px] min-h-[108px] py-4 flex flex-col gap-2">
        <Skeleton className="w-[80%] h-[28px] rounded-md" />
        <Skeleton className="w-[90%] h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default MainBigSizeNewsSkeleton;
