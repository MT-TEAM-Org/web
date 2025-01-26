import Arrow_left from "@/app/_components/icon/Arrow_left";
import ChatScheduleCard from "./chatScheduleCard";
import Arrow_right from "@/app/_components/icon/Arrow_right";

interface ScheduleSliderProps {
  title: string;
}

const ScheduleSlider: React.FC<ScheduleSliderProps> = ({ title }) => {
  return (
  <div className="flex flex-col items-center">
    <div className="flex justify-between items-center w-full m-3">
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


      <div className="flex items-center">
        <div className="flex gap-4 max-w-[1200px] min-h-[120px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <ChatScheduleCard key={index.toString()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSlider;