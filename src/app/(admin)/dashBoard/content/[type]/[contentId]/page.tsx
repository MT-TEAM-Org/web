"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { type, contentId } = useParams();
  console.log(type, contentId);

  if (type === "post" || type === "comment") router.push("/dashBoard/content");

  return (
    <div>
      <p>{type}</p>
      <p>{contentId}</p>
    </div>
  );
};

export default Page;
