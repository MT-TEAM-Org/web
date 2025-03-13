"use client";

import React, { useState } from "react";
import Image from "next/image";
import Single_logo_color from "@/app/_components/icon/Single_logo_color";
import { CommentContent } from "@/app/_constants/newsCommentType";
import useTimeAgo from "@/utils/useTimeAgo";
import usePatchNewsComment from "@/_hooks/fetcher/news/comment/usePatchNewsComment";
import useDeleteNewsComment from "@/_hooks/fetcher/news/comment/useDeleteNewsComment";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ReportModalPopUp from "@/app/_components/ReportModalPopUp";
import useCommentDelete from "@/_hooks/fetcher/news/comment/useCommentDelete";
import useAuthCheck from "@/_hooks/useAuthCheck";
import DeleteCommentModalPopUp from "@/app/_components/DeleteCommentModalPopUp";

interface CommentItemProps {
  className?: string;
  bestComment?: boolean;
  replyComment?: boolean;
  data?: CommentContent;
}

const NewsCommentItem = ({ data, bestComment = false }: CommentItemProps) => {
  const formattedTime = useTimeAgo(data?.createTime);
  const queryClient = useQueryClient();
  const params = useParams();
  const [activeModal, setActiveModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);

  const id = params.id;

  const { mutate: mutatePostRecommend } = usePatchNewsComment();
  const { mutate: mutateDeleteRecommend } = useDeleteNewsComment();
  const { mutate: mutateDeleteComment } = useCommentDelete();
  const { data: meData } = useAuthCheck();

  const mePublicId = meData?.data?.data?.publicId;
  const isMyComment = mePublicId === data?.memberDto?.publicId;

  const handleNewsComment = () => {
    if (!data?.recommend) {
      mutatePostRecommend(data?.newsCommentId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          queryClient.invalidateQueries({
            queryKey: ["getNewsInfo", String(id)],
          });
        },
        onError: (error) => {
          console.error("추천 실패:", error);
        },
      });
    } else if (data?.recommend) {
      mutateDeleteRecommend(data?.newsCommentId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          queryClient.invalidateQueries({
            queryKey: ["getNewsInfo", String(id)],
          });
        },
        onError: (error) => {
          console.error("추천 삭제 실패:", error);
        },
      });
    }
  };

  const handleDeleteComment = () => {
    mutateDeleteComment(data?.newsCommentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getNewsComment", String(id)],
        });
        queryClient.invalidateQueries({
          queryKey: ["getNewsInfo", String(id)],
        });
      },
      onError: (error) => {
        console.error("댓글 삭제 실패:", error);
      },
    });
  };

  const handleToggle = () => {
    setActiveModal(!activeModal);
  };

  const handleDeleteToggle = () => {
    setActiveDeleteModal(!activeDeleteModal);
  };

  const divStyle =
    "w-full h-auto flex flex-col border-b border-gray1 gap-3 p-3 bg-white justify-start";
  const recommendDivStyle =
    data?.recommendCount >= 1 ? "min-w-[70px]" : "w-[55px]";

  return (
    <div className={bestComment ? divStyle + " !bg-[#F8FDFF]" : divStyle}>
      <div className="w-full h-auto flex flex-col gap-3">
        <div className="w-full min-h-[20px] flex justify-between">
          <div className="flex justify-center items-center gap-2 text-xs">
            <Image
              src={"/Empty_news.png"}
              alt="fake_img"
              width={20}
              height={20}
              className="w-5 h-5 rounded-full border-1 border-gray2"
            />
            <p className="text-sm text-gray6 leading-5 font-medium">
              {data?.memberDto?.nickName}
            </p>
            <p className="text-gray5 leading-4 font-medium">{formattedTime}</p>
            <p className="text-gray4 leading-[18px] font-medium">{data?.ip}</p>
          </div>

          <div
            onClick={isMyComment ? handleDeleteToggle : handleToggle}
            className="h-[20px] rounded-[5px] py-[9px] pl-3 flex gap-[10px]"
          >
            <p className="text-[14px] text-gray5 font-medium cursor-pointer">
              {isMyComment ? "삭제" : "신고"}
            </p>
          </div>
        </div>
        {data?.imgUrl && (
          <Image
            src={`${data?.imgUrl}`}
            alt="comment img"
            width={200}
            height={200}
            className="w-[200px] h-[200px] object-cover"
          />
        )}

        <p className="flex text-[14px] leading-5 text-gray7 font-medium overflow-hidden text-ellipsis whitespace-pre-wrap max-h-[40px]">
          {data?.comment}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleNewsComment}
          className={`${recommendDivStyle} h-[24px] rounded-[5px] border border-gray3 p-2 flex gap-1 justify-center items-center text-xs leading-[18px] font-medium tracking-[-0.02em]`}
        >
          <Single_logo_color />
          <div className="flex gap-[2px]">
            추천
            {data?.recommendCount ? <span>{data?.recommendCount}</span> : null}
          </div>
        </button>
        <button className="min-w-[60px] min-h-[24px] rounded-[5px] border border-gray3 px-2 py-[6px] gap-[10px] text-xs font-medium leading-[12px] tracking-[-0.02em]">
          답글 달기
        </button>
        {activeModal && <ReportModalPopUp setActiveModal={setActiveModal} />}
        {activeDeleteModal && (
          <DeleteCommentModalPopUp
            setActiveModal={setActiveDeleteModal}
            onDelete={handleDeleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default NewsCommentItem;
