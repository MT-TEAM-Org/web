"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MetaPanel from "@/app/(admin)/_components/userDetail/MetaPanel";
import UserDetailFeedbackList from "@/app/(admin)/_components/userDetail/UserDetailFeedbackList";
import DetailTitle from "@/app/(admin)/_components/detail/DetailTitle";

const Page = () => {
  const router = useRouter();
  const { type, contentId } = useParams();

  useEffect(() => {
    if (type !== "post" && type !== "comment" && type !== "chat") {
      router.push("/dashBoard/content");
    }
  }, [type]);

  // 상단 제목
  const getContentTitle = () => {
    switch (type) {
      case "post":
        return "게시글 내역 상세";
      case "comment":
        return "댓글 내역 상세";
      case "chat":
        return "채팅 내역 상세";
    }
  };

  // 메타 테이블 제목
  const getContentMetaTitle = () => {
    switch (type) {
      case "post":
        return "게시물 정보";
      case "comment":
        return "댓글 정보";
      case "chat":
        return "채팅 정보";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <DetailTitle title={getContentTitle()} backPath="/dashBoard/content" />
      <div className="w-full flex gap-10">
        <MetaPanel type="content" title={getContentMetaTitle()} />
        <UserDetailFeedbackList
          totalCount="165"
          type="detailContent"
          title="신고 받은 내역"
        />
      </div>
    </div>
  );
};

export default Page;
