"use client";

import { use, useRef, useState } from "react";
import LiveSection from "../../_components/LiveSection";
import MatchPrediction from "../../_components/MatchPrediction";
import useGetMatchSchedule from "@/_hooks/fetcher/match-controller/useGetMatchSchedule";
import MatchDetailSkeleton from "../../_components/matchSkeleton";
import BoardComment from "@/app/(route)/(community)/_components/BoardComment";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import { CommentItem } from "@/_types/comment";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchType: string; matchId: number }>;
}) {
  const unwrappedParams = use(params);
  const { matchType, matchId } = unwrappedParams;
  const matchIdNum = matchId;
  const stringId = matchId.toString();

  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );

  const { data: matchSchedule, isLoading } = useGetMatchSchedule(matchType);

  const comments = useRef(null);

  const onHandleToTop = () => {
    if (comments.current) {
      const navBarHeight = 130; // 네비게이션 바 높이
      const y =
        comments.current.getBoundingClientRect().top +
        window.scrollY -
        navBarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <MatchDetailSkeleton matchType={matchType} />;
  }

  return (
    <div className="flex flex-col justify-start w-full max-w-[1200px] mx-auto gap-x-[40px]">
      <div className="flex flex-col max-w-[800px] ">
        {matchType === "ESPORTS" && (
          <div className="w-full">
            <LiveSection matchId={matchIdNum} />
          </div>
        )}
        <div className="w-full">
          <MatchPrediction scheduleData={matchSchedule} matchId={matchIdNum} />
        </div>
      </div>
      <div className="w-full max-w-[800px] bg-white">
        <BoardComment
          ref={comments}
          id={stringId}
          setParentsComment={setParentsComment}
          type="MATCH"
        />
      </div>

      <div className="sticky bottom-0 bg-white z-50 flex justify-center w-full max-w-[800px]">
        <div className="w-full max-w-[768px]">
          <SendCommentBox
            id={stringId}
            type="MATCH"
            parentsComment={parentsComment}
            setParentsComment={setParentsComment}
          />
        </div>
      </div>
    </div>
  );
}
