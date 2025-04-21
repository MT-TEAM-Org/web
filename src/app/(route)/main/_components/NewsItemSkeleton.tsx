import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const NewsItemSkeleton = () => {
  return (
    <div className="w-full max-h-[68px] flex items-center p-2 border-gray-300">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[68px] h-[68px] rounded-[4.25px]" />

      {/* 제목 및 내용 영역 */}
      <div
        className={cn(
          "w-[368px] h-[68px] flex flex-col justify-center px-4 gap-1",
          "mobile:w-full"
        )}
      >
        <Skeleton className="w-full h-[24px] rounded-md" />
        <Skeleton className="w-full h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default NewsItemSkeleton;
