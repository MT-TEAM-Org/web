import { Skeleton } from "@heroui/react";

const RightNewsItemSkeleton = () => {
  return (
    <div className="min-w-[288px] min-h-[92px] flex justify-start items-center border-b border-gray2 p-3 gap-3">
      {/* 썸네일 이미지 영역 */}
      <Skeleton className="w-[68px] h-[68px] rounded-[4.25px]" />

      {/* 제목과 내용 영역 */}
      <div className="min-w-[184px] h-auto min-h-[68px] flex flex-col justify-center items-start gap-1">
        {/* 제목 영역 */}
        <Skeleton className="w-[184px] h-[24px] rounded-md" />

        {/* 내용 영역 */}
        <Skeleton className="w-[184px] h-[40px] rounded-md" />
      </div>
    </div>
  );
};

export default RightNewsItemSkeleton;
