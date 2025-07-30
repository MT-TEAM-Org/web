import FeedbackItemSkeleton from "./FeedbackItemSkeleton";

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
