import React from "react";
import Image from "next/image";
import { FeedbackInfoType } from "../../../../_types/FeedbackInfoType";
import { getYouTubeEmbedUrl } from "../../_utils/getYouTubeEmbedUrl";

interface InfoImgSectionProps {
  feedbackInfoData: FeedbackInfoType;
}

const InfoImgSection = ({ feedbackInfoData }: InfoImgSectionProps) => {
  const youtubeEmbedUrl = getYouTubeEmbedUrl(feedbackInfoData?.link);

  return (
    <>
      {(feedbackInfoData?.imgUrl || youtubeEmbedUrl) && (
        <div className="w-full flex flex-col gap-3 aspect-video">
          {feedbackInfoData?.imgUrl && !youtubeEmbedUrl && (
            <Image
              src={feedbackInfoData?.imgUrl}
              alt="Feedback img"
              width={672}
              height={128}
              className="mobile:w-full mobile:h-auto"
            />
          )}
          {youtubeEmbedUrl && (
            <iframe
              width="100%"
              height="408"
              src={youtubeEmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mobile:h-full"
            />
          )}
          {!youtubeEmbedUrl && feedbackInfoData?.link && (
            <div className="w-[679px] min-h-[42px] mobile:w-full">
              <div>{feedbackInfoData?.link}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InfoImgSection;
