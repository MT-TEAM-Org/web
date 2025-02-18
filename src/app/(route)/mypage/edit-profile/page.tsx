"use client";

import Input from "@/app/_components/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FormData {
  email: string;
  password: string;
  tel: string;
  nickname: string;
  birthDate: string;
  genderType: "M" | "W" | null;
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
    gcTime: 1000 * 60 * 60,
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
  const { data: userInfo, isLoading: userInfoIsLoading } = useUserInfo();
  const { mutate: modifyUserInfo, isPending: modifyUserInfoIsPending } =
    useModifyUserInfo();
  const [genderType, setGenderType] = useState<"M" | "W" | null>(null);
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
    const requestData = { ...data, genderType };
    modifyUserInfo(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      },
    });
  };

  const buttonStyle = "w-1/2 h-[40px] border-[1px] rounded-[5px]";
  return (
    <div className="max-w-[720px] rounded-[5px] bg-[#FFFFFF]">
      <div className="flex items-center w-full min-h-[52px] p-[12px] border-b-[1px] border-[#EEEEEE]">
        <h2 className="text-[18px] font-[700] leading-[28px] text-[#303030]">
          내 정보 수정
        </h2>
      </div>

      <div className="min-h-[958px] px-[12px] py-[24px]">
        {!userInfoIsLoading ? (
          <form
            className="max-w-[328px] min-h-[910px] mx-auto space-y-[24px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-[4px] items-center w-full min-h-[158px]">
              <p className="text-center text-[14px] leading-[22px] text-[#424242]">
                프로필 사진
              </p>
              <div className="flex flex-col items-center gap-[12px]">
                <div className="w-[80px] h-[80px] rounded-full bg-black"></div>
                <button
                  type="button"
                  className="flex items-center h-[40px] rounded-[5px] border-[1px] border-[#DBDBDB] px-[16px] py-[13px] text-[14px] leading-[22px] text-[#424242]"
                >
                  사진 수정
                </button>
              </div>
            </div>

            {/* <div className="flex justify-between min-h-[56px] rounded-[10px] p-[16px] bg-[#FAFAFA] text-[#303030]">
              <p className="leading-[24px]">가입 유형</p>
              <p className="font-[700] leading-[24px]">SNS 회원가입 (구글)</p>
            </div> */}

            {inputObject.map((input) => (
              <div key={input.id} className="flex flex-col gap-[4px]">
                <Input
                  height={48}
                  register={register}
                  label={input.label}
                  type={input.type}
                  id={input.id}
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
                id="birthDate"
                register={register}
                required={false}
                placeholder="980101과 같이 6자리를 입력해주세요"
              />
            </div>
            <div className="w-full min-h-[48px] flex justify-between">
              <button
                type="button"
                className="text-[14px] leading-[18px] underline text-[#000000]"
              >
                회원탈퇴
              </button>
              <button
                className={`defaultButtonColor w-[120px] min-h-[48px] rounded-[5px] px-[20px] py-[16px] text-white font-[700] text-[16px] leading-[16px] ${
                  modifyUserInfoIsPending
                    ? "bg-[#EEEEEE] text-[#CBCBCB]"
                    : "defaultButtonColor"
                }`}
                disabled={modifyUserInfoIsPending}
              >
                수정완료
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default EditProfile;
