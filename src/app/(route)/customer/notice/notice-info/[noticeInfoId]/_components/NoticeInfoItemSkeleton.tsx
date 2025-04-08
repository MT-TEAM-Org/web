import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

const NoticeInfoItemSkeleton = () => {
  return (
    <div
      className={cn(
        "w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]",
        "tablet:w-[688px]",
        "mobile:w-[360px]"
      )}
    >
      <div className="w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col">
        <Skeleton className="w-[300px] h-[24px]" />
        <div
          className={cn(
            "w-full max-w-[672px] min-h-[20px] flex gap-4",
            "mobile:flex-col"
          )}
        >
          <div
            className={cn("w-full min-h-[20px] flex gap-2", "mobile:flex-col")}
          >
            <div className={cn("flex", "mobile:flex-col")}>
              <Skeleton
                className={cn(
                  "w-[140px] h-[20px]",
                  "mobile:w-[250px] mobile:hidden"
                )}
              />
              <Skeleton className={cn("w-[60px] h-[20px]", "mobile:hidden")} />
            </div>
            <div className={cn("flex gap-2", "mobile:flex-col")}>
              <Skeleton
                className={cn("w-[45px] h-[20px]", "mobile:w-[200px]")}
              />
              <Skeleton className={cn("w-[25px] h-[20px]", "mobile:hidden")} />
            </div>
          </div>
          <Skeleton className="w-[235px] h-[20px]" />
        </div>
      </div>

      <hr />

      <div className="w-full max-w-[672px] min-h-[188px] flex flex-col gap-3">
        <Skeleton
          className={cn("w-[672px] h-[128px]", "w-[640px]", "mobile:w-[320px]")}
        />
        <Skeleton className={cn("w-full h-[48px]", "mobile:w-[320px]")} />
      </div>
    </div>
  );
};

export default NoticeInfoItemSkeleton;
