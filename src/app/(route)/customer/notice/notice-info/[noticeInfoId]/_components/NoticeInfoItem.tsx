import React from "react";
import Image from "next/image";
import { NoticeInfoItemType } from "@/app/_constants/customer/NoticeInfoItemType";
import useTimeAgo from "@/utils/useTimeAgo";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import EmptyComment from "@/app/(route)/(community)/gameboard/_components/EmptyComment";
import PostAction from "@/app/(route)/(community)/_components/PostAction";

interface NoticeInfoItemProps {
  data: NoticeInfoItemType;
}

const NoticeInfoItem = ({ data }: NoticeInfoItemProps) => {
  const timeAgo = useTimeAgo(data?.createdAt);

  const noticeStats = [
    { label: "조회수", value: data?.viewCount },
    { label: "댓글", value: data?.commentCount },
    { label: "추천", value: data?.recommendCount },
  ];

  const link = data?.link || "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(link);

  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b p-6 flex flex-col gap-4 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)]">
      <div className="w-full max-w-[672px] min-h-[56px] flex gap-2 flex-col">
        <h1 className="font-bold text-[18px] leading-7 tracking-[-0.72px]">
          {data?.title}
        </h1>
        <div className="w-full max-w-[672px] min-h-[20px] flex gap-4">
          <div className="w-full min-h-[20px] flex gap-2">
            <div className="min-w-[140px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6">
              <p className="font-bold">고객센터</p>
              <p>공지사항</p>
              <p>{timeAgo}</p>
            </div>
            <div className="flex gap-2">
              {noticeStats.map((stat, index) => (
                <div
                  key={index}
                  className="min-w-[45px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6"
                >
                  <p className="font-bold">{stat.label}</p>
                  <p>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[235px] min-h-[20px] flex gap-1 text-[14px] leading-5 text-gray6">
            <p>{data?.nickname}</p>
            <p>{data?.clientIp}</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="w-full max-w-[672px] min-h-[188px] flex flex-col gap-3">
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
          />
        )}
        {!youtubeEmbedUrl && (
          <div className="w-[679px] min-h-[42px]">
            <div>{data?.link}</div>
          </div>
        )}
        <div
          className="w-full max-w-[672px] min-h-[48px] font-medium text-[16px] leading-6 tracking-[-0.02em] text-gray7"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
      <PostAction type="community" />
      <div className="w-full h-auto flex flex-col">
        <CommentBar />
        <EmptyComment />
      </div>
      <PostNavigation />
    </div>
  );
};

export default NoticeInfoItem;
