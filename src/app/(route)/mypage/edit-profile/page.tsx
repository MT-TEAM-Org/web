"use client";

import Input from "@/app/_components/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { REGISTRATION } from "@/app/_constants/userRegistration";
import useGetMyPageData from "@/_hooks/fetcher/mypage/useGetMyPageData";
import ProfileImage from "./_components/ProfileImage";
import { useToast } from "@/_hooks/useToast";
import useDeleteImage from "@/_hooks/fetcher/mypage/useDeleteImage";
import DeleteAccountModal from "./_components/DeleteAccountModal";
import useDeleteAccount from "@/_hooks/fetcher/mypage/useDeleteAccount";
import { cn } from "@/utils";
import useLogout from "@/_hooks/fetcher/mypage/useLogout";
import ConfirmModal from "@/app/_components/ConfirmModal";
import MobileBackButtonWrapper from "../_components/MobileBackButton";

interface FormData {
  email: string;
  password: string;
  tel: string;
  nickname: string;
  birthDate: string;
  genderType: "M" | "W" | null;
  imageUrl: string;
}

const fetchUserInfo = async () => {
  const response = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/modify`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
  });
};

const fetchModifyUserInfo = async (data: FormData) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}api/my-page/modify`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

const useModifyUserInfo = () => {
  return useMutation({
    mutationFn: (data: FormData) => fetchModifyUserInfo(data),
  });
};

const EditProfile = () => {
  const queryClient = useQueryClient();
  const { error, success } = useToast();
  const { data: userInfo, isLoading: userInfoIsLoading } = useUserInfo();
  const { data: mypageData, isLoading } = useGetMyPageData();
  const { mutate: modifyUserInfo, isPending: modifyUserInfoIsPending } =
    useModifyUserInfo();
  const { mutate: deleteAccount, isPending: deleteAccountIsPending } =
    useDeleteAccount();
  const { mutate: logout, isPending: logoutIsPending } = useLogout();
  const { mutate: deleteImage } = useDeleteImage();
  const [genderType, setGenderType] = useState<"M" | "W" | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (userInfo) {
      setGenderType(userInfo.data.genderType);
      setValue("email", userInfo.data.email);
      setValue("tel", userInfo.data.tel);
      setValue("nickname", userInfo.data.nickname);
      setValue("birthDate", userInfo.data.birthDate);
      setImageUrl(userInfo.data.imageUrl);
    }
  }, [userInfo]);

  const inputObject = [
    {
      label: "이메일",
      type: "text",
      id: "email" as keyof FormData,
    },
    {
      label: "비밀번호",
      type: "password",
      id: "password" as keyof FormData,
      validation: "영문+숫자 조합 4자~10자 이내",
    },
    {
      label: "핸드폰 번호",
      type: "text",
      id: "tel" as keyof FormData,
      validation: "10자~11자 이내",
    },
    {
      label: "닉네임",
      type: "text",
      id: "nickname" as keyof FormData,
      validation:
        "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로) 정치 관련, 반사회적, 성적, 욕설 닉네임은 제재대상",
    },
  ];

  const onSubmit = (data: FormData) => {
    if (
      data.tel === userInfo.data.tel &&
      data.nickname === userInfo.data.nickname &&
      (data.birthDate === "" || data.birthDate === userInfo.data.birthDate) &&
      genderType === userInfo.data.genderType &&
      imageUrl === userInfo.data.imageUrl &&
      data.password === ""
    ) {
      error("수정이 실패하였습니다.", "회원정보를 변경해주세요!");
      return;
    }

    // 빈 문자열을 null로 변환
    const requestData = {
      ...data,
      genderType,
      imageUrl,
      password: data.password === "" ? null : data.password,
      birthDate: data.birthDate === "" ? null : data.birthDate,
    };

    modifyUserInfo(requestData, {
      onSuccess: () => {
        if (
          imageUrl !== userInfo.data.imageUrl &&
          userInfo.data.imageUrl !== null
        ) {
          deleteImage(
            userInfo.data.imageUrl.split("media.playhive.co.kr/").pop()
          );
        }
        success("수정이 완료되었습니다.", "플레이하이브에서 재밌게 놀아봐요!");
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      },
    });
  };

  const handleDeleteAccount = () => {
    setShow(false);
    deleteAccount();
  };

  const handleLogout = () => {
    setLogoutShow(false);
    logout();
  };

  const buttonStyle = "w-1/2 h-[40px] border-[1px] rounded-[5px]";
  return (
    <div
      className={cn(
        "rounded-[5px] bg-[#FFFFFF] shadow-soft-md",
        "tablet:mb-[40px]",
        "mobile:mx-auto mobile:shadow-none"
      )}
    >
      <MobileBackButtonWrapper />
      <div
        className={cn(
          "flex items-center w-full min-h-[52px] p-[12px] border-b-[1px] border-[#EEEEEE]",
          "mobile:hidden"
        )}
      >
        <h2 className="text-[18px] font-[700] leading-[28px] text-[#303030]">
          내 정보 수정
        </h2>
      </div>

      <div
        className={cn("min-h-[958px] px-[12px] py-[24px]", "mobile:p-[16px]")}
      >
        {!userInfoIsLoading && (
          <form
            className="max-w-[328px] min-h-[910px] mx-auto space-y-[24px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ProfileImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <div className="flex justify-between min-h-[56px] rounded-[10px] p-[16px] bg-[#FAFAFA] text-gray8">
              <p className="leading-[24px]">가입 유형</p>
              {mypageData?.data?.registrationMethod && (
                <p className="font-[700] leading-[24px] text-gray7">
                  {mypageData?.data?.registrationMethod === "LOCAL"
                    ? "일반 회원가입"
                    : `${
                        REGISTRATION[mypageData?.data?.registrationMethod]
                          ?.defaultText
                      }(${
                        REGISTRATION[mypageData?.data?.registrationMethod]
                          ?.value
                      })`}
                </p>
              )}
            </div>

            {inputObject.map((input) => (
              <div
                key={input.id}
                className={`flex flex-col gap-[4px] ${
                  mypageData?.data?.registrationMethod &&
                  mypageData?.data?.registrationMethod !== "LOCAL" &&
                  input.id === "password"
                    ? "hidden"
                    : ""
                }`}
              >
                <Input
                  height={48}
                  register={register}
                  label={input.label}
                  type={input.type}
                  id={input.id}
                  gap={4}
                  isDisabled={input.id === "email"}
                />
                <label
                  htmlFor={input.id}
                  className="text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]"
                >
                  {input.validation}
                </label>
              </div>
            ))}
            <div className="flex flex-col gap-[4px]">
              <label className="text-[14px] leading-[22px] text-[#424242]">
                성별
              </label>
              <div className="w-full flex gap-[8px] text-[14px] leading-[22px] text-[#424242]">
                <button
                  className={`${buttonStyle} ${
                    genderType === "M" ? "border-[#424242]" : "border-[#DBDBDB]"
                  }`}
                  type="button"
                  onClick={() => setGenderType("M")}
                >
                  남성
                </button>
                <button
                  className={`${buttonStyle} ${
                    genderType === "W" ? "border-[#424242]" : "border-[#DBDBDB]"
                  }`}
                  type="button"
                  onClick={() => setGenderType("W")}
                >
                  여성
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              <label
                htmlFor="birth"
                className="text-[14px] leading-[22px] text-[#424242]"
              >
                생년월일
              </label>
              <Input
                height={48}
                type="number"
                id="birthDate"
                register={register}
                required={false}
                placeholder="980101과 같이 6자리를 입력해주세요"
              />
            </div>
            <div className="w-full min-h-[48px] flex justify-between">
              <button
                type="button"
                className={cn(
                  "text-[14px] leading-[18px] underline text-[#000000]",
                  "mobile:hidden"
                )}
                onClick={() => setShow(true)}
              >
                회원탈퇴
              </button>
              <button
                className={cn(
                  `defaultButtonColor w-[120px] min-h-[48px] rounded-[5px] px-[20px] py-[16px] text-white font-[700] text-[16px] leading-[16px] ${
                    modifyUserInfoIsPending
                      ? "bg-[#EEEEEE] text-[#CBCBCB]"
                      : "defaultButtonColor"
                  }`,
                  "mobile:w-full"
                )}
                disabled={modifyUserInfoIsPending}
              >
                수정완료
              </button>
            </div>
            <div
              className={cn(
                "hidden",
                "mobile:flex mobile:justify-between mobile:w-full mobile:min-h-[34px]"
              )}
            >
              <button
                type="button"
                className={cn(
                  "w-[50%] text-[14px] leading-[18px] underline text-[#000000]"
                )}
                onClick={() => setShow(true)}
              >
                회원탈퇴
              </button>
              <button
                type="button"
                onClick={() => setLogoutShow(true)}
                disabled={logoutIsPending}
                className={cn(
                  "w-[50%] text-[14px] leading-[18px] underline text-[#000000]"
                )}
              >
                로그아웃
              </button>
            </div>
          </form>
        )}
      </div>
      {show && (
        <DeleteAccountModal
          isOpen={() => setShow(true)}
          isPending={deleteAccountIsPending}
          onClose={() => setShow(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
      <ConfirmModal
        show={logoutShow}
        onClose={() => setLogoutShow(false)}
        title="로그아웃 하시겠습니까?"
        message="다시 로그인 하셔야합니다."
        onConfirm={handleLogout}
        closeText="취소"
        confirmText="로그아웃"
        isPending={logoutIsPending}
      />
    </div>
  );
};

export default EditProfile;
