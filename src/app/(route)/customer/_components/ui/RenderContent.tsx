import React from "react";
import EmptyItem from "../common/EmptyItem";
import { PageInfo } from "@/app/(route)/mypage/_types/toolbarType";

interface BaseDataList {
  content: unknown[];
  pageInfo: PageInfo;
}

interface RenderContentProps<T = unknown> {
  isLoadingState: boolean;
  isEmptyState: boolean;
  LoadingComponent: React.ComponentType;
  ListComponent: React.ComponentType<{
    dataList: BaseDataList;
    slicedDataList?: unknown[];
    searchParams: URLSearchParams;
  }>;
  dataList: BaseDataList;
  slicedDataList?: unknown[];
  searchParams: URLSearchParams;
  emptyTitle: string;
}

const RenderContent = ({
  isLoadingState,
  isEmptyState,
  LoadingComponent,
  ListComponent,
  dataList,
  slicedDataList = [],
  searchParams,
  emptyTitle,
}: RenderContentProps) => {
  if (isLoadingState) {
    return <LoadingComponent />;
  }

  if (isEmptyState) {
    return <EmptyItem title={emptyTitle} />;
  }

  return (
    <ListComponent
      dataList={dataList}
      slicedDataList={slicedDataList}
      searchParams={searchParams}
    />
  );
};

export default RenderContent;
