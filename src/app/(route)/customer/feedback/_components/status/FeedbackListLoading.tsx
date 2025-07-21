import FeedbackItemSkeleton from "../../../_components/FeedbackItemSkeleton";

const FeedbackListLoading = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <FeedbackItemSkeleton key={`feedback-${index}`} />
      ))}
    </>
  );
};
export default FeedbackListLoading;
