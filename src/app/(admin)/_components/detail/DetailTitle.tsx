import Icon from "@/app/_components/IconComponents";
import Link from "next/link";
import React from "react";

const DetailTitle = ({
  title,
  backPath,
}: {
  title: string;
  backPath: string;
}) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      <Link href={backPath}>
        <Icon icon="BACK_ARROW" />
      </Link>
      <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
        {title}
      </h1>
    </div>
  );
};

export default DetailTitle;
