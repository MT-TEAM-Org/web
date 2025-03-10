"use client";

import { MypageToolbar } from "../../_components/MypageToolbar";
import useGetInquiriesList from "@/_hooks/useMypage/useGetInquiriesList";
import MyPageInquiriesItem from "./MyPageInquiriesItem";
import MyPagePostEmpty from "../../posts/_components/MypagePostEmpty";
import { useSearchParams } from "next/navigation";

interface InquiriesListConfig {
  page: number;
  size: number;
  orderType: "ANSWERED";
  searchType: "CONTENT" | "COMMENT";
  search: string;
}

interface InquiriesListData {
  content: {
    id: number;
    content: string;
    clientIp: string;
    createdAt: string;
    publicId: string;
    nickname: string;
    isAdminAnswered: string;
    commentCount: number;
  }[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
}

const MyPageInquiriesList = () => {
  const searchParams = useSearchParams();
  const inquiriesOption: InquiriesListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 5,
    orderType:
      (searchParams.get("order_type") as InquiriesListConfig["orderType"]) ||
      "ANSWERED",
    searchType:
      (searchParams.get("search_type") as InquiriesListConfig["searchType"]) ||
      "CONTENT",
    search: searchParams.get("keyword") || "",
  };
  const { data, isLoading } = useGetInquiriesList(inquiriesOption);
  const { content, pageInfo } = data?.data?.list || {};

  return (
    <div>
      <MypageToolbar mode="inquries" pageInfo={pageInfo} />
      <div className="flex flex-col items-center w-full bg-[#FFFFFF] rounded-b-[5px]">
        {pageInfo?.totalElement !== 0 ? (
          content?.map((inquiries: InquiriesListData["content"][number]) => (
            <MyPageInquiriesItem key={inquiries.id} data={inquiries} />
          ))
        ) : (
          <MyPagePostEmpty />
        )}
      </div>
    </div>
  );
};

export default MyPageInquiriesList;
