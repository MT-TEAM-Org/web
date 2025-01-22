import ScheduleContainer from "@/app/(route)/main/_components/scheduleContainer";

export default function HomePage() {
  return (
    <>
      <ScheduleContainer/>
      <div className="min-h-[704px]">
        <div className="w-full max-w-[1200px] min-h-[704px] mb-[356px] flex gap-x-10">
          <div className="max-w-[862px] min-h-[704px] border flex-1">
            <div className="w-[410px] h-[236px] bg-amber-200 rounded-xl m-2">뉴스</div>
          </div>
          <div className="max-w-[298px] minh-[696px] border flex-1">
            게임할인 테이블
          </div>
        </div>
      </div>
    </>

  );
}
