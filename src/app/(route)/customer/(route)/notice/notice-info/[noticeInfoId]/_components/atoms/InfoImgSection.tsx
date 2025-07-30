import { NoticeInfoItemType } from "@/app/(route)/customer/_types/NoticeInfoItemType";
import React from "react";
import Image from "next/image";

interface InfoImgSectionProps {
  data: NoticeInfoItemType;
}

const InfoImgSection = ({ data }: InfoImgSectionProps) => {
  const link = data?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = link && getYouTubeEmbedUrl(link);

  return (
    <>
      {(data?.imgUrl || youtubeEmbedUrl) && (
        <div className="w-full flex flex-col gap-3 aspect-video">
          {data?.imgUrl && !youtubeEmbedUrl && (
            <Image
              src={data?.imgUrl}
              alt="Feedback img"
              width={672}
              height={128}
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
          {!youtubeEmbedUrl && data?.link && (
            <div className="w-[679px] min-h-[42px]">
              <div>{data?.link}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InfoImgSection;
