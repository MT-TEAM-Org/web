import useDeleteFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/useDeleteFeedbackRecommend";
import usePostFeedbackRecommend from "@/_hooks/fetcher/customer/Recommend/usePostFeedbackRecommend";
import { useQueryClient } from "@tanstack/react-query";

const useFeedbackRecommendToggle = (
  id: string | string[],
  adminRole: "USER" | "ADMIN" | null,
  feedbackInfoData: any, // TODO: 타입 변경
  setIsSignInModalOpen: any
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
