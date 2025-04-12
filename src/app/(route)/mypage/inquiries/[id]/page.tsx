"use client";

import { Suspense, use, useRef, useState } from "react";
import useGetInquiriesDetail from "@/_hooks/fetcher/mypage/useGetInquiriesDetail";
import MyPageInquiriesList from "../_components/MyPageInquiriesList";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import MyPageInquirieComment from "../_components/MyPageInquirieComment";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { CommentItem } from "@/_types/comment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

interface InquirieDetailProps {
  id: string;
}

interface InquirieDetailData {
  clientIp: string;
  commentCount: number;
  content: string;
  createdAt: string;
  inquiryId: string;
  nickname: string;
  publicID: string;
}

const InquirieDetail = ({
  params,
}: {
  params: Promise<InquirieDetailProps>;
}) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const pathname = usePathname();
  const { data, isLoading } = useGetInquiriesDetail(id);
  const inquirieDetail: InquirieDetailData = data?.data;
  const comments = useRef(null);
  const { data: authCheckData } = useAuthCheck();
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );
  const userRole = authCheckData?.data?.data?.role;

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

  return (
    <>
      <div className={cn("space-y-[12px]", "mobile:space-y-[0px]")}>
        <div
          className={cn(
            "flex flex-col justify-center gap-[16px] w-[720px] min-h-[497px] rounded-b-[5px] p-[24px] bg-white",
            "tablet:w-[688px]",
            "mobile:w-full mobile:gap-0 mobile:justify-start mobile:min-h-[0px] mobile:p-0"
          )}
        >
          <h1
            className={cn(
              "text-[18px] font-[700] leading-[28px] text-gray8",
              "mobile:px-[16px] mobile:pt-[12px] mobile:text-[16px] mobile:mb-[4px]"
            )}
          >
            {userRole === "ADMIN" ? "문의내역 상세" : "나의 문의내역 상세"}
          </h1>
          <div
            className={cn(
              "flex justify-between items-center text-[14px] leading-[20px] text-gray6",
              "mobile:flex-col mobile:items-start mobile:gap-[4px] mobile:px-[16px] mobile:text-[12px]"
            )}
          >
            <div className="flex gap-[8px]">
              <span className="font-[700]">마이페이지</span>
              <span>{userRole === "ADMIN" ? "문의내역" : "나의 문의내역"}</span>
              <span>{CalculateTime(inquirieDetail?.createdAt)}</span>
              <span>
                <span className="font-[700]">댓글</span>{" "}
                {inquirieDetail?.commentCount}
              </span>
            </div>
            <div className="flex gap-[4px]">
              <span>{inquirieDetail?.nickname}</span>
              <span>IP {inquirieDetail?.clientIp}</span>
            </div>
          </div>
          <div
            className={cn(
              "h-[1px] bg-gray2",
              "mobile:mx-[16px] mobile:my-[12px]"
            )}
          ></div>
          <p
            className={cn(
              "min-h-[48px] leading-[24px] text-gray7",
              "mobile:px-[16px] mobile:mb-[12px]"
            )}
          >
            {inquirieDetail?.content}
          </p>
          <MyPageInquirieComment
            ref={comments}
            id={inquirieDetail?.inquiryId}
            publicId={data?.data?.publicID}
            setParentsComment={setParentsComment}
          />
          <PostNavigation
            nextId={data?.data?.nextId}
            previousId={data?.data?.previousId}
            scrollToCommentBar={onHandleToTop}
            currentPath={pathname}
          />
        </div>
        <Suspense fallback={""}>
          <div
            className={cn(
              "max-w-[720px] h-auto bg-[#FAFAFA] rounded-[5px]",
              "mobile:mx-auto"
            )}
          >
            <MyPageInquiriesList />
          </div>
        </Suspense>
      </div>
      <div
        className={cn(
          "shadow-md sticky bottom-0 max-w-[720px]",
          "mobile:w-full mobile:mx-auto"
        )}
      >
        <SendCommentBox
          id={id.toString()}
          type="INQUIRY"
          parentsComment={parentsComment}
          setParentsComment={setParentsComment}
        />
      </div>
    </>
  );
};

export default InquirieDetail;
