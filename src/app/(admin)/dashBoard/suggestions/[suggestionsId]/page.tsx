import React from "react";
import MetaPanel from "../../../_components/userDetail/MetaPanel";
import DetailTitle from "@/app/(admin)/_components/detail/DetailTitle";
import DetailTable from "@/app/(admin)/_components/table/DetailTable";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <DetailTitle
        title="개선요청 내역 상세"
        backPath="/dashBoard/suggestions"
      />
      <div className="w-full flex gap-10">
        <MetaPanel type="suggestions" title="개선요청 내역" />
        <DetailTable
          isList={false}
          totalCount="165"
          type="suggestions"
          title="개선요청 내역"
        />
      </div>
    </div>
  );
};

export default Page;
