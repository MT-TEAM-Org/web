import ScheduleContainer from "@/app/(route)/main/_components/scheduleContainer";
import NewsComponent from "./_components/newsComponent";
import HotPost from "./_components/hotPost";
import GameDiscountInfo from "./_components/gameDiscountInfo";

export default function HomePage() {
  return (
    <>
      <ScheduleContainer/>
      <div className="min-h-[704px]">
        <div className="w-full max-w-[1200px] min-h-[704px] mb-[356px] flex gap-x-10">
          <div className="max-w-[862px] min-h-[704px] border flex-1">
            <div>
              <div className="flex my-5 gap-2">
                <div className="w-[410px] h-[236px] bg-amber-200 rounded-xl">뉴스</div>
                <NewsComponent/>
              </div>
              <div className="flex">
                <HotPost />
                <HotPost />
              </div>

            </div>


          </div>
          <div className="max-w-[298px] min-h-[696px] flex-1">
          <GameDiscountInfo />
          </div>
        </div>
      </div>
    </>

  );
}
