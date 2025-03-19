import { Skeleton } from "@heroui/react";

const NoticeInfoItemSkeleton = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
      <div className="w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col">
        <Skeleton className="w-[300px] h-[24px]" />
        <div className="w-full max-w-[672px] min-h-[20px] flex gap-4">
          <div className="w-full min-h-[20px] flex gap-2">
            <Skeleton className="w-[140px] h-[20px]" />
            <Skeleton className="w-[60px] h-[20px]" />
            <Skeleton className="w-[45px] h-[20px]" />
            <Skeleton className="w-[25px] h-[20px]" />
          </div>
          <Skeleton className="w-[235px] h-[20px]" />
        </div>
      </div>

      <hr />

      <div className="w-full max-w-[672px] min-h-[188px] flex flex-col gap-3">
        <Skeleton className="w-[672px] h-[128px]" />
        <Skeleton className="w-full h-[48px]" />
      </div>
    </div>
  );
};

export default NoticeInfoItemSkeleton;
