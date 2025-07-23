import React from "react";
import FeedbackInfoSkeleton from "../status/FeedbackInfoSkeleton";
import FeedbackMeta from "../FeedbackMeta";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";

interface FeedbackMetaContainerProps {
  feedbackInfoData: FeedbackInfoType;
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
