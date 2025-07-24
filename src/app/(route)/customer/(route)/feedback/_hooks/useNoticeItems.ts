// 공지사항 데이터 호출 커스텀 훅 (최상단 2개 표시 용도)
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