import { Skeleton } from "@heroui/react";

const RightNewsItemSkeleton = () => {
  return (
    <div className="min-w-[288px] min-h-[92px] flex justify-center items-center border-b border-gray2 p-3 cursor-pointer gap-3">
      {/* 썸네일 이미지 영역 */}
      <div className="w-[68px] h-[68px]">
        <Skeleton className="w-[68px] h-[68px] rounded-[5px]" />
      </div>

      {/* 텍스트 영역 */}
      <div className="min-w-[194px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
        {/* 제목 */}
        <Skeleton className="w-[194px] h-[24px] rounded-md" />

        {/* 내용 */}
        <Skeleton className="w-[194px] h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default RightNewsItemSkeleton;
