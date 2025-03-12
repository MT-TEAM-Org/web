"use client";

import { useForm } from "react-hook-form";
import AccountHelp from "../../_components/AccountHelp";
import useFindId from "@/_hooks/useFindId";
import { useState } from "react";
import ResultFindId from "./ResultFindId";

interface FormData {
  tel: string;
  email: string;
}

interface FindIdResponse {
  email: string;
  type: "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE | DISCORD";
}

const FindId = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [findId, setFindId] = useState<null | FindIdResponse>(null);
  const { mutate, isPending } = useFindId();

  const onSubmit = (data: FormData) => {
    if (data.tel === "") {
      alert("핸드폰 번호를 입력해주세요.");
      return;
    }
    mutate(data, {
      onSuccess: (data) => {
        reset();
        setFindId(data?.data?.members[0]);
      },
    });
  };

  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  return (
    <>
      {!findId ? (
        <form className="space-y-[24px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-[2px] relative">
            <label
              htmlFor="tel"
              className="text-[14px] leading-[22px] text-[#424242]"
            >
              핸드폰 번호<span className="text-[#D1504B]">*</span>
            </label>
            <input
              {...register("tel" as keyof FormData, { required: true })}
              type="text"
              className={isPending ? isDisabledInputStyle : inputStyle}
              id="tel"
              disabled={isPending}
              placeholder="핸드폰 번호를 입력해주세요."
            />
          </div>
          <button
            className={
              "w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor"
            }
            disabled={isPending}
            type="submit"
          >
            다음
          </button>
          <AccountHelp signState="signup" />
        </form>
      ) : (
        <ResultFindId findId={findId} />
      )}
    </>
  );
};

export default FindId;
