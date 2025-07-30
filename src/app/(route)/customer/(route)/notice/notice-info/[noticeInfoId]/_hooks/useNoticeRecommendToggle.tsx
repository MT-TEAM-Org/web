import useDeleteNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteNoticeRecommend";
import usePostNoticeRecommend from "@/_hooks/fetcher/customer/Recommend/usePostNoticeRecommend";
import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import { useQueryClient } from "@tanstack/react-query";

const useNoticeRecommendToggle = (
  id: string | string[],
  adminRole: "USER" | "ADMIN" | null,
  noticeInfoData: NoticeInfoItemType,
  setIsSignInModalOpen: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: noticeAddRecommend } = usePostNoticeRecommend();
  const { mutate: noticeDeleteRecommend } = useDeleteNoticeRecommend();

  const handleRecommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = noticeInfoData?.isRecommended;
    const feedbackAction = isRecommended
      ? noticeDeleteRecommend
      : noticeAddRecommend;

    feedbackAction(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["noticeInfo", id] });
      },
    });
  };
  return { handleRecommend };
};

export default useNoticeRecommendToggle;
