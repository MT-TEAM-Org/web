"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import useGetInquiriesDetail from "@/_hooks/fetcher/mypage/useGetInquiriesDetail";
import MyPageInquiriesList from "../_components/MyPageInquiriesList";
import { useInquiryPostIdStore } from "@/utils/Store";
import SendCommentBox from "@/app/_components/_comment/SendCommentBox";
import MyPageInquirieComment from "../_components/MyPageInquirieComment";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { CalculateTime } from "@/app/_components/CalculateTime";
import { CommentItem } from "@/_types/comment";
import PostNavigation from "@/app/(route)/(community)/_components/PostNavigation";
import { usePathname } from "next/navigation";

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
  const { addInquiryPostId } = useInquiryPostIdStore();
  const { data: authCheckData } = useAuthCheck();
  const [parentsComment, setParentsComment] = useState<CommentItem | null>(
    null
  );
  const userRole = authCheckData?.data?.data?.role;

  useEffect(() => {
    if (!id) return;
    addInquiryPostId(Number(id));
  }, [id]);

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
      <div className="space-y-[12px]">
        <div className="flex flex-col justify-center gap-[16px] w-[720px] min-h-[497px] rounded-b-[5px] p-[24px] bg-white">
          <h1 className="text-[18px] font-[700] leading-[28px] text-gray8">
            {userRole === "ADMIN" ? "문의내역 상세" : "나의 문의내역 상세"}
          </h1>
          <div className="flex justify-between items-center text-[14px] leading-[20px] text-gray6">
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
          <div className="h-[1px] bg-gray2"></div>
          <p className="min-h-[48px] leading-[24px] text-gray7">
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
          <div className="max-w-[720px] h-auto bg-[#FAFAFA] rounded-[5px]">
            <MyPageInquiriesList />
          </div>
        </Suspense>
      </div>
      <div className="shadow-md sticky bottom-0">
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
