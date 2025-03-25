import { Skeleton } from "@heroui/react";

const MypageInquirieSkelton = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div className="flex items-center gap-[12px] w-full min-h-[66px] border-b-1 border-[#FAFAFA] p-[12px]">
            <Skeleton className="min-w-[65px] h-[32px] rounded-[2px]" />
            <div className="w-full min-h-[42px] flex flex-col justify-center gap-[4px]">
              <div className="w-[619px] flex items-center gap-[2px]">
                <Skeleton className="w-[60%] h-[20px] rounded-md" />
              </div>
              <div className="flex gap-[4px]">
                <Skeleton className="w-[21px] h-[16px] rounded-md" />
                <Skeleton className="w-[28px] h-[16px] rounded-md" />
                <Skeleton className="w-[60px] h-[16px] rounded-md" />
                <Skeleton className="w-[88px] h-[16px] rounded-md" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MypageInquirieSkelton;
