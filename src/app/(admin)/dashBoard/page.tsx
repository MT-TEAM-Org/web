import OverviewStatBox from "../_components/statusBanner/OverviewStatBox";
import StatusBanner from "../_components/statusBanner/StatusBanner";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="w-full ">
        <OverviewStatBox title="운영 현황" type="home" />
        <StatusBanner type="home2" />
      </div>
    </div>
  );
}
