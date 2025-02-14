import Arrow_left from "@/app/_components/icon/Arrow_left";
import Arrow_right from "@/app/_components/icon/Arrow_right";
import ChatScheduleCard from "./chatScheduleCard";

interface ScheduleSliderProps {
  title: string;
}

const ScheduleSlider: React.FC<ScheduleSliderProps> = ({ title }) => {
  return (
    <div className="min-w-[1200px] min-h-[172px] flex flex-col gap-3 items-center">
      <div className="w-full min-h-[40px] flex justify-between items-center">
        <h1 className="text-[20px] font-[700] leading-[36px] tracking-[-2%]">
          {title}
        </h1>
        <div className="flex gap-2">
          <button className="w-[40px] h-[40px] flex justify-center items-center text-gray-500 border border-[#DBDBDB] rounded-[5px]">
            <Arrow_left />
          </button>
          <button className="w-[40px] h-[40px] flex justify-center items-center text-gray-500 border border-[#DBDBDB] rounded-[5px]">
            <Arrow_right />
          </button>
        </div>
      </div>

      <div className="w-full h-[120px] max-w-[1200px] min-h-[120px] flex gap-3 items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <ChatScheduleCard key={index.toString()} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleSlider;
