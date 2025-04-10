import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const NoticeInfoItemSkeleton = () => {
  return (
    <div
      className={cn(
        "max-w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
        "tablet:max-w-[688px]",
        "mobile:max-w-[720px]"
      )}
    >
      <div
        className={cn(
          "w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col",
          "mobile:gap-1"
        )}
      >
        <Skeleton className={cn("w-[300px] h-[24px]", "mobile:w-[90%]")} />
        <div
          className={cn(
            "w-full max-w-[672px] min-h-[20px] flex gap-4",
            "mobile:flex-col mobile:max-w-[768px] mobile:gap-1"
          )}
        >
          <div
            className={cn("w-full min-h-[20px] flex gap-2", "mobile:flex-col")}
          >
            <div className={cn("flex gap-2", "mobile:flex-col")}>
              <Skeleton className={cn("w-[140px] h-[20px]", "mobile:hidden")} />
              <Skeleton className={cn("w-[60px] h-[20px]", "mobile:hidden")} />
            </div>
            <div className={cn("flex gap-2", "mobile:flex-col")}>
              <Skeleton className={cn("w-[45px] h-[20px]", "mobile:w-[80%]")} />
              <Skeleton className={cn("w-[25px] h-[20px]", "mobile:hidden")} />
            </div>
          </div>
          <Skeleton className={cn("w-[235px] h-[20px]", "mobile:w-[70%]")} />
        </div>
      </div>

      <hr />

      <div
        className={cn(
          "w-full max-w-[672px] min-h-[188px] flex flex-col gap-3",
          "mobile:max-w-[768px]"
        )}
      >
        <Skeleton
          className={cn(
            "w-full h-[128px]",
            "tablet:w-[640px]",
            "mobile:w-full"
          )}
        />
        <Skeleton className={cn("w-full h-[48px]", "mobile:w-full")} />
      </div>
    </div>
  );
};

export default NoticeInfoItemSkeleton;
