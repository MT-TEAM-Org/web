import Image from "next/image";
import MainRightBar from "./_components/MainRightBar";
import NewPost from "./_components/NewPost";
import ScheduleContainer from "./_components/scheduleContainer";
import HotPost from "./_components/hotPost";
import NewsComponent from "./_components/newsComponent";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <ScheduleContainer />
      <div className="min-h-[704px]">
        <div className="w-full max-w-[1200px] min-h-[704px] mb-[356px] flex gap-x-10">
          <div className="max-w-[862px] min-h-[668px] flex gap-10">
            <div className="flex flex-col gap-10">
              <div className="max-w-[862px] min-h-[236px] flex gap-4">
                <Image
                  src="/mainNews_fake.png"
                  alt="main news"
                  width={410}
                  height={236}
                  className="w-[410px] h-[236px] rounded-[10px] cursor-pointer"
                />
                <NewsComponent />
              </div>
              <div className="flex gap-6">
                <HotPost />
                <NewPost />
              </div>
            </div>
          </div>
          <div className="max-w-[298px] min-h-[696px] flex-1">
            <MainRightBar />
          </div>
        </div>
      </div>
    </div>
  );
}
