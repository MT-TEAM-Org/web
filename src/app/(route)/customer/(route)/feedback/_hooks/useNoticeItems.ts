import useGetNoticeDataList from "@/_hooks/fetcher/customer/useGetNoticeDataList";
import { NoticeContentType } from "../../../_types/NoticeItemType";

const useNoticeItems = () => {
    
  const {
    data: noticeListData,
    isError: noticeIsError,
    isLoading: noticeIsLoading,
  } = useGetNoticeDataList();

  const slicedNoticeDataList = (noticeListData?.content as NoticeContentType[])
    ?.sort((a, b) => b.id - a.id)
    .slice(0, 2);

    return {
      slicedNoticeDataList,
      noticeIsError,
      noticeIsLoading,
    }
}

export default useNoticeItems