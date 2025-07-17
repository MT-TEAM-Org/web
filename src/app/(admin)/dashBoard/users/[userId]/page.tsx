import React from "react";
import DetailTitle from "@/app/(admin)/_components/detail/DetailTitle";
import DetailTable from "@/app/(admin)/_components/table/DetailTable";
import UserDetailMeta from "./_components/UserDetailMeta";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10">
      <div className="w-full flex flex-col gap-4">
        <DetailTitle title="회원 정보 상세" backPath="/dashBoard/users" />
        <UserDetailMeta />
      </div>
      <DetailTable
        type="userDetail"
        isList
        title="신고 받은 내역"
        totalCount="165"
        isUserDetail
      />
    </div>
  );
};

export default Page;
