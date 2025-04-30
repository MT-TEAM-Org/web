import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const DetailTitleSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justift-center gap-y-[8px]">
      <Skeleton className="w-full max-w-[200px] h-[20px] rounded-[5px] " />
      <div
        className={cn(
          "flex items-center justify-between mb-[24px]",
          "mobile:flex-col mobile:gap-y-[4px] mobile:items-start"
        )}
      >
        <Skeleton className="w-full max-w-[400px] mobile:max-w-[300px] h-[15px] rounded-[5px] " />
        <Skeleton className="w-full max-w-[200px] mobile:max-w-[200px] h-[15px] rounded-[5px] " />
      </div>
    </div>
  );
};

export default DetailTitleSkeleton;
