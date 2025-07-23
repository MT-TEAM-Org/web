import React from "react";
import FeedbackInfoSkeleton from "../atoms/FeedbackInfoSkeleton";
import FeedbackMeta from "../organisms/FeedbackMeta";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";

interface FeedbackMetaContainerProps {
  feedbackInfoData: FeedbackInfoType;
  id: string | string[];
  adminRole: "USER" | "ADMIN" | undefined;
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
