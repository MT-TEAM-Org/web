"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import Single_logo from "@/app/_components/icon/Single_logo";

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

  const id = Number(params.id);

  const { mutate: mutatePostRecommend } = usePatchNewsComment();
  const { mutate: mutateDeleteRecommend } = useDeleteNewsComment();
  const { mutate: mutateDeleteComment } = useCommentDelete();
  const { data: meData } = useAuthCheck();

  const mePublicId = meData?.data?.data?.publicId;
  const isMyComment = mePublicId === data?.memberDto?.publicId;

  const [isRecommended, setIsRecommended] = useState(data?.recommend || false);
  const [recommendCount, setRecommendCount] = useState(
    data?.recommendCount || 0
  );

  // 댓글 추천, 추천 삭제 함수
  const handleCommentLikeToggle = () => {
    if (!isRecommended) {
      mutatePostRecommend(data?.newsCommentId, {
        onSuccess: () => {
          setIsRecommended(true);
          setRecommendCount(recommendCount + 1);
          queryClient.refetchQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          queryClient.refetchQueries({
            queryKey: ["getBestComment", id],
          });
        },
      });
    } else {
      mutateDeleteRecommend(data?.newsCommentId, {
        onSuccess: () => {
          setIsRecommended(false);
          setRecommendCount(recommendCount - 1);
          queryClient.refetchQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          queryClient.refetchQueries({
            queryKey: ["getBestComment", id],
          });
        },
      });
    }
  };

  console.log(queryClient.getQueryCache().findAll());

  // 댓글 삭제 실행 함수
  const deleteComment = () => {
    setActiveDeleteModal(false);
    mutateDeleteComment(data?.newsCommentId, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["getNewsComment", String(id)],
        });
        queryClient.refetchQueries({
          queryKey: ["getBestComment", id],
        });
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
  const recommendDivStyle = recommendCount >= 1 ? "min-w-[61px]" : "w-[53px]";

  return (
    <div className={bestComment ? divStyle + " !bg-[#F8FDFF]" : divStyle}>
      <div className="w-full h-auto flex flex-col gap-3">
        <div className="w-full min-h-[20px] flex justify-between">
          <div className="flex justify-center items-center gap-2 text-xs font-medium">
            <Image
              src={"/Empty_news.png"}
              alt="fake_img"
              width={20}
              height={20}
              className="w-5 h-5 rounded-full border-1 border-gray2"
            />
            <p className="text-sm text-gray6 leading-5">
              {data?.memberDto?.nickName}
            </p>
            <p className="text-gray5 leading-4">{formattedTime}</p>
            <p className="text-gray4 leading-[18px]">{data?.ip}</p>
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
          onClick={handleCommentLikeToggle}
          className={`${recommendDivStyle} h-[24px] rounded-[5px] border border-gray3 p-1 flex gap-1 justify-center items-center text-[12px] leading-[18px] font-medium tracking-[-0.02em]`}
        >
          <Single_logo width="12" height="12" fill="#00ADEE" />
          <div
            className={`flex gap-[2px] ${
              isRecommended && "text-[#00ADEE] bg-white border-[#00ADEE]"
            }`}
          >
            추천
            {recommendCount >= 1 && <span>{recommendCount}</span>}
          </div>
        </button>
        <button className="inline-flex h-6 items-center justify-center rounded-[5px] border border-gray3 bg-white px-2 py-[6px] gap-[10px] text-[12px] font-medium leading-none tracking-[-0.02em] text-gray7">
          답글 달기
        </button>
        {activeModal && <ReportModalPopUp setActiveModal={setActiveModal} />}
        {activeDeleteModal && (
          <DeleteCommentModalPopUp
            setActiveModal={setActiveDeleteModal}
            onDelete={deleteComment}
          />
        )}
      </div>
    </div>
  );
};

export default NewsCommentItem;
