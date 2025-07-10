"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MetaPanel from "@/app/(admin)/_components/userDetail/MetaPanel";
import UserDetailFeedbackList from "@/app/(admin)/_components/userDetail/UserDetailFeedbackList";
import Icon from "@/app/_components/IconComponents";

const Page = () => {
  const router = useRouter();
  const { type, contentId } = useParams();

  useEffect(() => {
    if (type !== "post" && type !== "comment" && type !== "chat") {
      router.push("/dashBoard/content");
    }
  }, [type]);

  const backName = () => {
    switch (type) {
      case "post":
        return "게시물 내역 상세";
      case "comment":
        return "댓글 내역 상세";
      case "chat":
        return "채팅 내역 상세";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-start">
        <button
          onClick={() => router.back()}
          className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black"
        >
          <Icon icon="BACK_ARROW" />
        </button>
        <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          {backName()}
        </h1>
      </div>
      <div className="w-full flex gap-10">
        <MetaPanel
          type="content"
          title={
            type === "post"
              ? "게시물 정보"
              : type === "comment"
              ? "댓글 정보"
              : "채팅 정보"
          }
        />
        <UserDetailFeedbackList
          totalCount="165"
          type="inquiry"
          title="게시물 정보"
        />
      </div>
    </div>
  );
};

export default Page;
