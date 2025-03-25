import ScheduleContainer from "../main/_components/scheduleContainer";

const MatchBroadcast = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[226px] flex justify-center items-center mx-auto bg-gray1">
        <div className="w-full">
          <ScheduleContainer showCategoryButtons={true} />
        </div>
      </div>
    </div>
  );
};

export default MatchBroadcast;
