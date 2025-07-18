import React from "react";
import MetaPanel from "../../../_components/userDetail/MetaPanel";
import DetailTitle from "@/app/(admin)/_components/detail/DetailTitle";
import DetailTable from "@/app/(admin)/_components/table/DetailTable";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <DetailTitle title="문의 내역 상세" backPath="/dashBoard/inquiries" />
      <div className="w-full flex gap-10">
        <MetaPanel type="inquiry" title="문의 정보" />
        <DetailTable
          isList={false}
          totalCount="165"
          type="inquiry"
          title="해당 유저의 문의 내역"
        />
      </div>
    </div>
  );
};

export default Page;
