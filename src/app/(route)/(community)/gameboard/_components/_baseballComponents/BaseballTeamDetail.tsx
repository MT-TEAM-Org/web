import React from "react";
import TeamDetailStatus from "../TeamDetailStatus";
import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Fake_scheduleItem2 from "@/app/_components/icon/Fake_scheduleItem2";

const BaseballTeamDetail = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full min-h-[28px] font-bold text-[18px] leading-7 tracking-[-0.04em]">
        <p>{title}</p>
      </div>
      <TeamDetailStatus
        title={"아우크스부르크"}
        teamLogo={<Fake_scheduleItem />}
      />
      <TeamDetailStatus
        title={"슈투트가르트"}
        teamLogo={<Fake_scheduleItem2 />}
      />
    </div>
  );
};

export default BaseballTeamDetail;
