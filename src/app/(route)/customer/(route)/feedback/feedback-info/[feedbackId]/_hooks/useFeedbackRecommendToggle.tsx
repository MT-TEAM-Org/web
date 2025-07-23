import useDeleteFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteFeedbackRecommend";
import usePostFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/usePostFeedbackRecommend";
import { useQueryClient } from "@tanstack/react-query";
import { FeedbackInfoType } from "../../../_types/FeedbackInfoType";

const useFeedbackRecommendToggle = (
  id: string | string[],
  adminRole: "USER" | "ADMIN" | null,
  feedbackInfoData: FeedbackInfoType,
  setIsSignInModalOpen: (open: boolean) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: feedbackAddRecommend } = usePostFeedbackRecommend();
  const { mutate: feedbackDeleteRecommend } = useDeleteFeedbackRecommend();

  const handleRecommend = () => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const isRecommended = feedbackInfoData?.isRecommended;
    const feedbackAction = isRecommended
      ? feedbackDeleteRecommend
      : feedbackAddRecommend;

    feedbackAction(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["feedbackInfo", id] });
      },
    });
  };
  return { handleRecommend };
};

export default useFeedbackRecommendToggle;
