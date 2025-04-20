"use client";

import Link from "next/link";
import { REGISTRATION } from "@/app/_constants/userRegistration";
import useGetMyPageData from "@/_hooks/fetcher/mypage/useGetMyPageData";
import Image from "next/image";
import { cn } from "@/utils";
import { Fragment } from "react";
import MobileBackButtonWrapper from "./_components/MobileBackButton";

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
    <div
      className={cn(
        "flex flex-col gap-[24px] w-[720px] min-h-[238px] bg-[#FFFFFF] rounded-[10px] p-[24px]",
        "tablet:rounded-t-none tablet:w-[688px]",
        "mobile:w-full mobile:h-[500px] mobile:p-[16px] mobile:gap-[16px]"
      )}
    >
      <MobileBackButtonWrapper />
      <div
        className={cn(
          "flex justify-between items-center min-h-[48px]",
          "mobile:justify-center"
        )}
      >
        <div
          className={cn(
            "flex gap-[12px]",
            "mobile:flex-col mobile:items-center"
          )}
        >
          <Image
            alt="profile-image"
            src={mypage?.img || "/userProfileIsNull.png"}
            width={48}
            height={48}
            className="w-[48px] h-[48px] rounded-full object-cover"
          />
          <div>
            <div
              className={cn(
                "flex items-center gap-[4px] text-[#181818] leading-[24px]",
                "mobile:justify-center"
              )}
            >
              <h2 className="font-[700]">{mypage?.nickname}</h2>
              <span className="text-[14px] leading-[20px] text-[#424242] font-[500]">
                {role}
              </span>
            </div>
            <p className="text-[14px] leading-[20px] text-[#424242]">
              플레이 하이브 방문을 진심으로 감사드립니다.
            </p>
          </div>
        </div>
        <Link href="/mypage/edit-profile" className="mobile:hidden">
          <button className="w-[120px] min-h-[40px] bg-[#FFFFFF] text-[#424242] rounded-[5px] px-[16px] py-[13px] border border-[#DBDBDB] text-[14px] font-[700] leading-[14px]">
            내 정보 수정
          </button>
        </Link>
      </div>

      <div className="space-y-[12px]">
        <div
          className={cn(
            "flex gap-[12px] min-h-[86px] rounded-[10px] bg-[#FAFAFA] py-[12px]",
            "mobile:gap-0 mobile:items-center"
          )}
        >
          {mypageInfo.map((info, index: number) => (
            <Fragment key={info.id}>
              <div className="mx-auto flex items-center">
                <div
                  className={cn(
                    "w-[149.25px] min-h-[62px] space-y-[4px]",
                    "mobile:w-[63.25px] mobile:min-h-[60px]"
                  )}
                >
                  <p
                    className={cn(
                      "text-[14px] leading-[20px] text-center text-gray7 text-nowrap",
                      "mobile:text-[12px]"
                    )}
                  >
                    {info.name}
                  </p>
                  <Link href={info.path || ""}>
                    <p
                      className={cn(
                        "text-[24px] text-[#303030] font-[900] leading-[38px] text-center underline",
                        "mobile:text-[20px]"
                      )}
                    >
                      {info.value}
                    </p>
                  </Link>
                </div>
                {index !== 3 && (
                  <div
                    className={cn(
                      "w-[1px] h-[40px] bg-[#EEEEEE]",
                      "mobile:hidden"
                    )}
                  ></div>
                )}
              </div>
              {index !== 3 && (
                <div
                  className={cn(
                    "hidden",
                    "mobile:w-[1px] mobile:h-[40px] mobile:bg-[#EEEEEE] mobile:block mobile:mx-[12px]"
                  )}
                ></div>
              )}
            </Fragment>
          ))}
        </div>

        <div
          className={cn(
            "flex justify-between items-center",
            "mobile:flex-col mobile:gap-[4px]"
          )}
        >
          <p className="text-[14px] leading-[20px] font-[400] text-[#656565]">
            회원가입일: {mypage?.registeredAt}
          </p>
          {mypage?.registrationMethod && (
            <p className="text-[14px] leading-[20px] font-[400] text-[#656565]">
              가입 유형 :{" "}
              {REGISTRATION[mypage?.registrationMethod]?.defaultText}
              {mypage?.registrationMethod !== "LOCAL"
                ? `, ${REGISTRATION[mypage?.registrationMethod]?.value}`
                : "일반 회원가입"}
            </p>
          )}
        </div>
      </div>
      <Link
        href="/mypage/edit-profile"
        className={cn("hidden", "tablet:hidden", "mobile:block")}
      >
        <button className="w-full min-h-[40px] bg-[#FFFFFF] text-[#424242] rounded-[5px] px-[16px] py-[13px] border border-[#DBDBDB] text-[14px] font-[700] leading-[14px]">
          내 정보 수정
        </button>
      </Link>
    </div>
  );
};

export default Mypage;
