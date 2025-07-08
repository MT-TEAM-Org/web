import Icon from "@/app/_components/IconComponents";
import React from "react";
import Link from "next/link";
import UserDetailFeedbackList from "../../../_components/userDetail/UserDetailFeedbackList";
import MetaPanel from "../../../_components/userDetail/MetaPanel";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-start">
        <Link href="/admin-inquiries">
          <Icon icon="BACK_ARROW" />
        </Link>
        <h1 className="font-bold text-[24px] leading-38px] tracking-[-0.04em] text-black">
          문의 내역 상세
        </h1>
      </div>
      <div className="w-full flex gap-10">
        <MetaPanel type="inquiry" title="문의 정보" />
        <UserDetailFeedbackList
          totalCount="165"
          type="inquiry"
          title="해당 유저의 문의 내역"
        />
      </div>
    </div>
  );
};

export default Page;
