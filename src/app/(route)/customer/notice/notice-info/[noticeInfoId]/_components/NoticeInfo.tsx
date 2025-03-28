"use client";

import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import NoticeInfoItemSkeleton from "./NoticeInfoItemSkeleton";
import NoticeInfoItem from "./NoticeInfoItem";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/CustomerTalkToolbar";
import NoticeItemSkeleton from "@/app/(route)/customer/_components/NoticeItemSkeleton";
import EmptyItem from "@/app/(route)/customer/_components/EmptyItem";
import NoticeItem from "@/app/(route)/customer/_components/NoticeItem";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <NoticeInfo />
    </Suspense>
  );
};

const NoticeInfo = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.noticeInfoId;
  const numberId = Number(id);
  const adminChecker = useAdminRole();
  const token = localStorage.getItem("accessToken");

  const noticeOption: noticeListConfig = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) || "",
    search: searchParams.get("search") || "",
  };

  const {
    data: noticeInfoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
  } = useGetNoticeInfoData({ id: numberId, token: token });

  const {
    data: noticeListData,
    isLoading,
    isError,
  } = useGetNoticeDataList(noticeOption);

  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeInfoItem data={noticeInfoData} id={numberId} />
      )}
      <div className="w-[720px] min-h-[120px] rounded-t-[5px] overflow-hidden">
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminChecker}
        />
      </div>
      <div className="w-[720px] h-auto rounded-[5px] bg-white shadow-md">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <NoticeItemSkeleton key={index} />
          ))
        ) : noticeListData?.content?.length === 0 || isError ? (
          <EmptyItem title="공지사항이" />
        ) : (
          noticeListData?.content?.map((noticeListData: NoticeContentType) => (
            <NoticeItem
              key={noticeListData.id}
              noticeData={noticeListData}
              searchString={searchParams.get("search")}
              searchType={searchParams.get("search_type")}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Page;
