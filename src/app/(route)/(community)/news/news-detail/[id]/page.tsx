"use client";

import React, { use, useRef, useState } from "react";
import Image from "next/image";
import Single_logo from "@/app/_components/icon/Single_logo";
import Share from "@/app/_components/icon/Share";
import CommentContainer from "./_components/CommentContainer";
import NewsPostItem from "../../_components/NewsPostItem";
import Copy from "@/app/_components/icon/Copy";
import CommentBar from "@/app/_components/_gnb/_components/CommentBar";
import SendCommentBox from "../../../_components/SendCommentBox";
import { NewsItemType } from "@/app/_constants/newsItemType";
import useGetNewsInfoData from "@/_hooks/useGetNewsInfoData";
import PostNavigation from "../../../_components/PostNavigation";
import useSortedNewsDataList from "@/_hooks/useSortedPosts";
import { useReadNews } from "@/_hooks/useReadNews";
import NewsTalkToolbar from "../../_components/NewsTalkToolbar";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">(
    "DATE"
  );
  const { id } = use(params);
  const { data } = useGetNewsInfoData(id);
  console.log("data: ", data);
  const [pageNum, setPageNum] = useState(1);
  const { data: newsListData } = useSortedNewsDataList({ orderType, pageNum });
  const sliceNewsListData = newsListData ? newsListData.slice(0, 3) : [];
  const updatedImgUrl = data?.thumbImg?.replace("type=w140", "type=w360"); // 뉴스 상세페이지 들어갔을때 이미지 화질 올리는 로직
  const { handleRead } = useReadNews(sliceNewsListData?.id, false);
  const commentBarRef = useRef(null);

  const changeCategory = (category: string) => {
    switch (category) {
      case "BASEBALL":
        return "야구";
      case "FOOTBALL":
        return "축구";
      case "ESPORTS":
        return "e스포츠";
      default:
        return "기타";
    }
  };

  // 뉴스 기사 올라온 시간 확인하는 로직
  const changeDateAgo = (newsTime: string | undefined) => {
    if (!newsTime) return "알 수 없음";

    const newsDate = new Date(newsTime);
    const now = new Date();

    const diffMs = now.getTime() - newsDate.getTime(); // 현재 시간과 뉴스 시간의 차이를 밀리초 단위로 계산
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 밀리초 차이를 분 단위로 변환
    const diffHours = Math.floor(diffMinutes / 60); // 분 차이를 시 단위로 변환
    const diffDays = Math.floor(diffHours / 24); // 시 차이를 24시간 단위로 변환하여 일 수 계산

    // 24시간 이상인 경우 일 단위로 표시
    if (diffDays > 0) {
      return `${diffDays}일 전`;
    }

    // 1시간 이상 24시간 미만인 경우 시, 분 단위로 표시
    if (diffHours > 0) {
      return `${diffHours}시간 전`;
    }

    // 1시간 미만인 경우 분 단위로 표시
    return diffMinutes > 0 ? `${diffMinutes}분 전` : "방금 전";
  };

  const copyBtn = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert("URL이 클립보드에 복사되었습니다!"); // 임시
    } catch (err) {
      alert("복사에 실패했습니다.");
    }
  };

  const onPageChange = (newPage: string) => {
    setPageNum(Number(newPage));
  };

  // useRef 사용해서 댓글 제일 위로 버튼 구현
  const onHandleToTop = () => {
    if (commentBarRef.current) {
      const navBarHeight = 130; // 네비게이션 바 높이
      const y =
        commentBarRef.current.getBoundingClientRect().top +
        window.scrollY -
        navBarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-[720px] h-auto bg-white p-6 rounded-[5px] border-b border-[#FFFFFF] shadow-sm mb-2">
        <div className="w-full h-auto flex flex-col gap-2">
          <h1 className="w-full h-auto font-bold text-[18px] leading-7 tracking-[-0.72px] text-[#303030]">
            {data?.title}
          </h1>

          <div className="w-full h-auto min-h-[20px] gap-4 flex justify-between text-[#EEEEEE]">
            <div className="flex gap-2 text-[#656565] font-[700] leading-5 text-[14px]">
              <div className="flex gap-1 font-medium text-[14px] leading-5">
                <p className="font-bold">{changeCategory(data?.category)}</p>
                <p>{changeDateAgo(data?.postDate)}</p>
              </div>
              <div className="flex gap-1 font-medium text-[14px] leading-5">
                <p className="font-bold">조회수 {data?.viewCount}</p>
                <p>댓글 {data?.commentCount}</p>
              </div>
              <div className="flex gap-1 font-medium text-[14px] leading-5">
                <p className="font-bold">추천</p>
                <p>{data?.recommendCount}</p>
              </div>
            </div>
            <div className="text-[14px] flex font-[500] leading-5 gap-1 text-[#656565]">
              <p>네이버 스포츠</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full h-auto flex flex-col gap-3">
          <Image
            src={data?.thumbImg ? updatedImgUrl : "/Empty_news.png"}
            alt="News detail img"
            width={672}
            height={338}
          />
          <p className="font-[500] text-[16px] leading-6 tracking-[-0.02em] text-[#424242] overflow-hidden line-clamp-2">
            컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
            컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
            컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분 컨텐츠들어갈부분
          </p>
        </div>

        <div className="w-full h-auto flex justify-center gap-2">
          <button className="min-w-[120px] w-auto h-[40px] flex items-center text-[14px] justify-center gap-1 px-4 py-[13px] bg-[#00ADEE] text-[#FFFFFF] font-bold rounded-[5px]">
            <Single_logo />
            추천 12
          </button>
        </div>

        <div className="w-full h-auto flex justify-between">
          <button className="min-w-[104px] w-auto min-h-[32px] rounded-[5px] text-[14px] font-[500] leading-[14px] flex items-center justify-center bg-[#FFFFFF] px-3 py-[9px] border border-[#DBDBDB]">
            기사 원문 보기
          </button>
          <div className="flex gap-2">
            <button
              onClick={copyBtn}
              className="min-w-[138px] w-auto min-h-[32px] flex justify-center gap-1 items-center bg-[#FFFFFF] px-3 py-2 rounded-[5px] border border-[#DBDBDB] text-[14px] leading-[14px] font-medium"
            >
              <Copy />
              게시글 URL 복사
            </button>
            <button className="min-w-[91px] w-auto min-h-[32px] flex justify-center gap-1 items-center bg-[#FFFFFF] pr-[12px] pl-[10px] py-2 rounded-[5px] border border-[#DBDBDB] text-[14px] leading-[14px] font-medium">
              <Share />
              공유하기
            </button>
          </div>
        </div>

        <div className="w-full h-auto" ref={commentBarRef}>
          <CommentBar data={data} />

          <div className="max-w-full h-auto">
            <CommentContainer />
          </div>
        </div>

        <PostNavigation scrollToCommentBar={onHandleToTop} />
      </div>
      <div className="shadow-sm">
        <NewsTalkToolbar
          setOrderType={setOrderType}
          onPageChange={onPageChange}
        />
      </div>
      <div className="w-[720px] min-h-[348px] rounded-b-[5px] overflow-hidden shadow-md">
        {sliceNewsListData?.map((data: NewsItemType) => (
          <div key={data.id} onClick={handleRead}>
            <NewsPostItem newsItem={data} />
          </div>
        ))}
      </div>
      <div className="shadow-md">
        <SendCommentBox />
      </div>
    </>
  );
};

export default Page;
