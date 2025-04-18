import { cn } from "@/utils";
import { Skeleton } from "@heroui/react";

interface MatchSkeletonProps {
  matchType: string;
}

const MatchDetailSkeleton = ({ matchType }: MatchSkeletonProps) => {
  const isEsports = matchType === "ESPORTS";
  return (
    <div
      className={cn(
        "flex justify-start w-full max-w-[1200px] items-center mx-auto gap-x-[40px]",
        "tablet:max-w-[769px]"
      )}
    >
      <div
        className={cn(
          "flex flex-col w-[800px] gap-y-6",
          "mobile:px-4 mobile:gap-y-2"
        )}
      >
        <Skeleton
          className={cn("w-full h-[52px] rounded-lg hidden", "mobile:block")}
        />

        {/* 라이브 섹션 스켈레톤 */}
        {isEsports && (
          <div className="w-full h-[440px] bg-gray1 rounded-lg flex justify-center items-center">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        )}

        <Skeleton
          className={cn("w-full h-[48px] rounded-lg hidden", "mobile:block")}
        />

        {/* 예측 섹션 스켈레톤 */}
        <div className={cn("w-full space-y-[12px]", "space-y-1")}>
          {/* 승부예측 */}
          <Skeleton
            className={cn("w-[25%] h-[38px] rounded-md", "mobile:hidden")}
          />

          {/* 팀이름 */}
          <div className="flex justify-between items-center">
            <Skeleton
              className={cn("w-[20%] h-[40px] rounded-lg", "mobile:h-[24px]")}
            />
            <Skeleton
              className={cn(
                "w-[10%] h-[24px] rounded-lg",
                "pc:hidden",
                "tablet:hidden"
              )}
            />
            <Skeleton
              className={cn("w-[20%] h-[40px] rounded-lg", "mobile:h-[24px]")}
            />
          </div>

          {/* 예측 클릭 */}
          <Skeleton className={cn("w-full h-[54px] rounded-md", "mobile:")} />
        </div>
        <div className="flex flex-col gap-1">
          {/* 댓글 */}
          <Skeleton className="w-full h-[300px] rounded-md" />

          {/* 댓글 전송 */}
          <Skeleton className="w-full h-[72px] rounded-md" />
        </div>
      </div>
      {/* <div className="w-[360px]">채팅 구역</div> */}
    </div>
  );
};

export default MatchDetailSkeleton;
