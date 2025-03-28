"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect } from "react";
import SearchToolbar from "../_components/SearchToolbar";
import SearchEmptyBox from "../_components/SearchEmptyBox";

type totalSearchType = "board" | "news";

const Page = () => {
  const params = useParams<{ totalSearchType: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchType = pathname.split("/")[2];

  const category =
    params.totalSearchType === "board" ? "news" : params.totalSearchType;

  useEffect(() => {
    const validTypes = ["board", "news"];
    if (!validTypes.includes(searchType)) {
      router.push("/404");
    }
  }, [searchType, router]);

  return (
    <div className="w-[720px] h-auto">
      <SearchToolbar />
      <div className="w-full h-[330px] rounded-b-[5px] shadow-sm bg-white">
        <SearchEmptyBox />
      </div>
    </div>
  );
};

export default Page;
