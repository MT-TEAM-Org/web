import ScheduleTap from "@/app/_components/ScheduleTap";

//최신화를 위한 더미 데이터

export default function HomePage() {
  return (
    <div className="min-h-[704px]">
      <ScheduleTap />
      <div className="w-full max-w-[1200px] min-h-[704px] mb-[356px] flex gap-x-10">
        <div className="max-w-[862px] min-h-[704px] border flex-1">
          게시글 테이블
        </div>
        <div className="max-w-[298px] minh-[696px] border flex-1">
          게임할인 테이블
        </div>
      </div>
    </div>
  );
}
