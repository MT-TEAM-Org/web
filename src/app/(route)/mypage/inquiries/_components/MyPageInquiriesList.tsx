"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import useGetInquiriesList from "@/_hooks/fetcher/mypage/useGetInquiriesList";
import MyPageInquiriesItem from "./MyPageInquiriesItem";
import MyPageInquiriesEmpty from "./MyPageInquiriesEmpty";
import { useSearchParams } from "next/navigation";
import { InquiriesListConfig, InquiriesListData } from "../_types/inquiries";
import MypageInquirieSkelton from "./MypageInquirieSkelton";
import MobileBackButtonWrapper from "../../_components/MobileBackButton";
import { cn } from "@/utils";
import Pagination from "../../_components/Pagination";
import { useRouter } from "next/navigation";
import changeURLParams from "../../util/changeURLParams";
import { usePathname } from "next/navigation";

const MyPageInquiriesList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split("/").pop() || "";

  const inquiriesOption: InquiriesListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 10,
    orderType:
      (searchParams.get("order_type") as InquiriesListConfig["orderType"]) ||
      null,
    searchType:
      (searchParams.get("search_type") as InquiriesListConfig["searchType"]) ||
      "CONTENT",
    search: searchParams.get("search") || "",
  };

  const { data, isLoading } = useGetInquiriesList(inquiriesOption);
  const { content, pageInfo } = data?.data?.list || {};

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageInfo.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <div>
      <MobileBackButtonWrapper mode="inquries" />
      <MypageToolbar mode="inquries" pageInfo={pageInfo} />
      <div className="flex flex-col w-full bg-[#FFFFFF] rounded-b-[5px]">
        {pageInfo?.totalElement !== 0 ? (
          content?.map((inquiries: InquiriesListData["content"][number]) => (
            <MyPageInquiriesItem key={inquiries.id} data={inquiries} />
          ))
        ) : (
          <MyPageInquiriesEmpty isMypage={postId === "inquiries"} />
        )}
        {isLoading && <MypageInquirieSkelton />}
        <div
          className={cn(
            "hidden",
            `mobile:block mobile:mt-[12px] mobile:mx-auto mobile:mb-[24px] mobile:${
              pageInfo?.totalElement === 0 ? "hidden" : "block"
            }`
          )}
        >
          <Pagination
            pageInfo={pageInfo}
            onPageChangeAction={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPageInquiriesList;
