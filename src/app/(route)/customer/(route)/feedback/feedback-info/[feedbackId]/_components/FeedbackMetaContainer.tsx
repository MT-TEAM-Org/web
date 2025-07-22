import React from "react";
import FeedbackInfoSkeleton from "./FeedbackInfoSkeleton";
import FeedbackMeta from "./FeedbackMeta";

interface FeedbackMetaContainerProps {
  feedbackInfoData: any; // TODO: 타입 변경
  id: string | string[];
  adminRole: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

const FeedbackMetaContainer = ({
  feedbackInfoData,
  id,
  adminRole,
  isLoading,
  isError,
}: FeedbackMetaContainerProps) => {
  return (
    <>
      {isLoading || isError ? (
        <FeedbackInfoSkeleton />
      ) : (
        <FeedbackMeta
          feedbackInfoData={feedbackInfoData}
          id={id}
          adminRole={adminRole}
        />
      )}
    </>
  );
};

export default FeedbackMetaContainer;
