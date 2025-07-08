import Icon from "@/app/_components/IconComponents";
import React from "react";
import Link from "next/link";
import ImprovementMeta from "./_components/ImprovementMeta";
import UserImprovementList from "./_components/UserImprovementList";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-start">
        <Link href="/admin-improvement">
          <Icon icon="BACK_ARROW" />
        </Link>
        <h1 className="font-bold text-[24px] leading-38px] tracking-[-0.04em] text-black">
          개선요청 내역 상세
        </h1>
      </div>
      <div className="w-full flex gap-10">
        <ImprovementMeta />
        <UserImprovementList />
      </div>
    </div>
  );
};

export default Page;
