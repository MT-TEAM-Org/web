import Icon from "@/app/_components/IconComponents";
import React from "react";
import Link from "next/link";
import UserDetailFeedbackList from "../../../_components/userDetail/UserDetailFeedbackList";
import MetaPanel from "../../../_components/userDetail/MetaPanel";
import DetailTitle from "@/app/(admin)/_components/detail/DetailTitle";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <DetailTitle
        title="개선요청 내역 상세"
        backPath="/dashBoard/suggestions"
      />
      <div className="w-full flex gap-10">
        <MetaPanel type="suggestions" title="개선요청 내역" />
        <UserDetailFeedbackList
          totalCount="165"
          type="suggestions"
          title="개선요청 내역"
        />
      </div>
    </div>
  );
};

export default Page;
