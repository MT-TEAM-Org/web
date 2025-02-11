"use client";

import { UseFormRegister } from "react-hook-form";
import AccountHelp from "../../_components/AccountHelp";

interface FormData {
  tel: string;
  email: string;
}

interface FindIdProps {
  register: UseFormRegister<FormData>;
}

const FindId = ({ register }: FindIdProps) => {
  const inputStyle =
    "w-full h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  return (
    <div className="space-y-[24px]">
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
          // className={isPending ? isDisabledInputStyle : inputStyle}
          className={inputStyle}
          id="tel"
          // disabled={isPending}
          placeholder="핸드폰 번호를 입력해주세요."
        />
      </div>
      <button
        className={
          "w-full h-[48px] text-[#FFFFFF] px-[20px] py-[16px] rounded-[5px] font-[700] leading-[16px] defaultButtonColor"
        }
        // disabled={isPending}
        type="submit"
      >
        다음
      </button>
      <AccountHelp signState="signup" />
    </div>
  );
};

export default FindId;
