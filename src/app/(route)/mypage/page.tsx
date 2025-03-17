"use client";

import Link from "next/link";
import { REGISTRATION } from "@/constants/userRegistration";
import useGetMyPageData from "@/_hooks/useMypage/useGetMyPageData";

const Mypage = () => {
  const { data, isLoading } = useGetMyPageData();
  const mypage = data?.data;
  const role = isLoading
    ? ""
    : mypage?.role === "USER"
    ? "일반 회원님"
    : "관리자님";

  const mypageInfo = [
    { name: "나의 방문횟수", id: 0, value: mypage?.totalVisitCount },
    {
      name: "내가 쓴 게시물",
      id: 1,
      value: mypage?.createdPostCount,
      path: "/mypage/posts",
    },
    {
      name: "내가 쓴 댓글",
      id: 2,
      value: mypage?.createdCommentCount,
      path: "/mypage/comments",
    },
    {
      name: "나의 문의내역",
      id: 3,
      value: mypage?.createdInquiryCount,
      path: "/mypage/inquiries",
    },
  ];

  return (
    <div className="flex flex-col gap-[24px] max-w-[720px] min-h-[238px] bg-[#FFFFFF] rounded-[10px] p-[24px]">
      <div className="flex justify-between items-center min-h-[48px]">
        <div className="flex gap-[12px]">
          <div className="w-[48px] h-[48px] rounded-full bg-black"></div>
          <div>
            <p className="font-[700] text-[#181818] leading-[24px]">
              {mypage?.nickname}
              <span className="ml-[4px] text-[14px] font-[500] leading-[20px] text-[#424242]">
                {role}
              </span>
            </p>
            <p className="text-[14px] leading-[20px] text-[#424242]">
              플레이 하이브 방문을 진심으로 감사드립니다.
            </p>
          </div>
        </div>

        <Link href="/mypage/edit-profile">
          <button className="w-[120px] min-h-[40px] bg-[#FFFFFF] text-[#424242] rounded-[5px] px-[16px] py-[13px] border border-[#DBDBDB] text-[14px] font-[700] leading-[14px]">
            내 정보 수정
          </button>
        </Link>
      </div>

      <div className="space-y-[12px]">
        <div className="flex gap-[12px] min-h-[86px] rounded-[10px] bg-[#FAFAFA] py-[12px]">
          {mypageInfo.map((info, index: number) => (
            <div key={info.id} className="mx-auto flex items-center">
              <div className="w-[149.25px] min-h-[62px] space-y-[4px]">
                <p className="text-[14px] leading-[20px] text-center">
                  {info.name}
                </p>
                <Link href={info.path || ""}>
                  <p className="text-[24px] text-[#303030] font-[900] leading-[38px] text-center underline">
                    {info.value}
                  </p>
                </Link>
              </div>
              {index !== 3 && (
                <div className="w-[1px] h-[40px] bg-[#EEEEEE]"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[14px] leading-[20px] font-[400] text-[#656565]">
            회원가입일: {mypage?.registeredAt}
          </p>
          <p className="text-[14px] leading-[20px] font-[400] text-[#656565]">
            가입 유형 : {REGISTRATION[mypage?.registrationMethod]?.defaultText}
            {mypage?.registrationMethod !== "LOCAL"
              ? `, ${REGISTRATION[mypage?.registrationMethod]?.value}`
              : "일반 회원가입"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
