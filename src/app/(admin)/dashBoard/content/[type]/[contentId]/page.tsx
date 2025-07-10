"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MetaPanel from "@/app/(admin)/_components/userDetail/MetaPanel";
import UserDetailFeedbackList from "@/app/(admin)/_components/userDetail/UserDetailFeedbackList";

const Page = () => {
  const router = useRouter();
  const { type, contentId } = useParams();

  useEffect(() => {
    if (type !== "post" && type !== "comment") {
      router.push("/dashBoard/content");
    }
  }, [type]);

  return (
    <div className="w-full flex gap-10">
      <MetaPanel type="inquiry" title="게시물 정보" />
      <UserDetailFeedbackList
        totalCount="165"
        type="inquiry"
        title="게시물 정보"
      />
    </div>
  );
};

export default Page;
