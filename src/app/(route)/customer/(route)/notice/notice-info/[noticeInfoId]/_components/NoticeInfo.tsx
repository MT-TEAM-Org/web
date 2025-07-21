"use client";

import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import useGetNoticeInfoData from "@/_hooks/fetcher/customer/useGetNoticeInfoData";
import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";
import { useAdminRole } from "@/app/(route)/customer/_utils/adminChecker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import NoticeInfoItemSkeleton from "./NoticeInfoItemSkeleton";
import NoticeInfoItem from "./NoticeInfoItem";
import CustomerTalkToolbar from "@/app/(route)/customer/_components/ui/CustomerTalkToolbar";
import NoticeItemSkeleton from "@/app/(route)/customer/(route)/notice/_components/status/NoticeItemSkeleton";
import EmptyItem from "@/app/(route)/customer/_components/common/EmptyItem";
import NoticeItem from "@/app/(route)/customer/(route)/notice/_components/items/NoticeItem";
import { NoticeContentType } from "@/app/(route)/customer/_types/NoticeItemType";
import { cn } from "@/utils";
import Pagination from "@/app/(route)/mypage/_components/Pagination";
import changeURLParams from "@/app/(route)/mypage/util/changeURLParams";

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
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > noticeListData?.pageInfo?.totalPage) return;
    router.push(changeURLParams(searchParams, "page", page.toString()), {
      scroll: false,
    });
  };

  return (
    <>
      {infoIsLoading || infoIsError ? (
        <NoticeInfoItemSkeleton />
      ) : (
        <NoticeInfoItem data={noticeInfoData} id={numberId} />
      )}
      <div
        className={cn(
          "w-[720px] min-h-[120px] rounded-t-[5px] mt-4",
          "tablet:w-full tablet:mt-3",
          "mobile:hidden"
        )}
      >
        <CustomerTalkToolbar
          showOptions={false}
          paginationData={noticeListData?.pageInfo}
          adminChecker={adminChecker}
        />
      </div>
      <div
        className={cn(
          "w-[720px] h-auto rounded-[5px] bg-white mb-10",
          "tablet:w-full",
          "mobile:w-full mobile:mt-3 mobile:mb-0"
        )}
      >
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

        {noticeListData?.pageInfo?.totalPage > 0 && (
          <div
            className={cn(
              "hidden",
              "mobile:block mobile:w-fit mobile:mt-[12px] mobile:mx-auto mobile:pb-6"
            )}
          >
            <Pagination
              pageInfo={noticeListData?.pageInfo}
              onPageChangeAction={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
