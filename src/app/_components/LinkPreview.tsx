"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface LinkPreviewProps {
  videoUrl: string;
}

const LinkPreview = ({ videoUrl }: LinkPreviewProps) => {
  const fetchPreview = async (videoUrl: string) => {
    const { data } = await axios.get(
      `/api/preview?url=${encodeURIComponent(videoUrl)}`
    );
    console.log(data);
    return data;
  };

  const { data: meta, error } = useQuery({
    queryKey: ["linkPreview", videoUrl],
    queryFn: () => fetchPreview(videoUrl),
    retry: false,
    enabled: !!videoUrl,
  });

  if (error) return <p className="text-center">URL 주소를 확인해주세요!</p>;

  return (
    meta && (
      <div className="flex w-[696px] h-[84px] rounded-[5px] bg-[#FAFAFA] p-[12px] gap-x-[12px]">
        {meta.images && meta.images.length > 0 && (
          <img
            src={meta.images[0]}
            alt={meta.title}
            width={200}
            className="max-w-[148px] min-h-[60px] rounded-[5px] object-cover"
          />
        )}
        <div className="w-[512px] min-h-[60px] flex flex-col gap-y-1">
          <h3 className="font-medium text-[14px] leading-[20px] text-[#424242]">
            {meta?.title}
          </h3>
          <p className="font-medium text-[12px] leading-[18px] text-[#A6A6A6]">
            {meta?.siteName}
          </p>
        </div>
      </div>
    )
  );
};

export default LinkPreview;
