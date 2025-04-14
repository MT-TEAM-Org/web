import { Skeleton } from "@heroui/react";

interface MatchSkeletonProps {
  matchType: string;
}

const MatchDetailSkeleton = ({ matchType }: MatchSkeletonProps) => {
  const isEsports = matchType === "ESPORTS";
  return (
    <div className="flex justify-start w-full max-w-[1200px] items-center mx-auto gap-x-[40px]">
      <div className="flex flex-col w-[800px] gap-y-[20px]">
        {/* 라이브 섹션 스켈레톤 */}
        {isEsports && (
          <div className="w-full h-[440px] bg-gray1 rounded-lg flex justify-center items-center">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        )}
        {/* 예측 섹션 헤더 스켈레톤 */}
        {/* 예측 섹션 스켈레톤 */}
        <div className="w-full space-y-[12px]">
          <Skeleton className="w-[200px] h-[28px] rounded-md" />
          <Skeleton className="w-full h-[100px] rounded-lg" />
          <div className="flex gap-4">
            <Skeleton className="flex-1 h-[48px] rounded-md" />
            <Skeleton className="flex-1 h-[48px] rounded-md" />
          </div>
        </div>
      </div>
      {/* <div className="w-[360px]">채팅 구역</div> */}
    </div>
  );
};

export default MatchDetailSkeleton;
