import { Skeleton } from "@heroui/react";

const NewsItemSkeleton = () => {
  return (
    <div className="flex items-center min-w-[436px] max-h-[68px] p-2 border-gray-300">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="max-w-[68px] min-h-[68px] rounded-[4.25px]" />

      {/* 제목 및 내용 영역 */}
      <div className="w-[368px] h-[68px] flex flex-col justify-center px-4 gap-1">
        <Skeleton className="w-full h-[24px] rounded-md" />
        <Skeleton className="w-full h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default NewsItemSkeleton;
