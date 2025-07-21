import OverviewStatBox from "../_components/statusBanner/OverviewStatBox";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="w-full h-[356px]">
        <OverviewStatBox title="운영 현황" type="dashBoard" />
      </div>
      <div className="w-full h-[452px] flex justify-center items-center gap-[40px]">
        <div className="w-full max-w-[778px] h-[404px] flex justify-center items-center">
          Graph
        </div>
        <div className="w-full max-w-[826px] flex justify-center items-center">
          Tap
        </div>
      </div>
    </div>
  );
}
