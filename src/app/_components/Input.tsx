"use client";

import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  helpText?: string;
  placeholder?: string;
  height: number;
  type?: string;
  id: string;
  register: UseFormRegister<any>;
  isDisabled?: boolean;
  defaultValue?: string;
  validation?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  height,
  type = "text",
  id,
  register,
  isDisabled = false,
  validation,
  required = true,
}) => {
  const inputStyle = `h-[${height}px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]`;
  const labelStyle = "text-[14px] leading-[22px] text-[#424242]";
  const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
  const isDisabledInputStyle =
    inputStyle + " bg-[#EEEEEE] border-[#DBDBDB] text-[#A6A6A6]";
  const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
  const isErrorTextStyle = helpTextStyle + " text-[#D1504B]";
  return (
    <div className="flex flex-col gap-[2px]">
      <label htmlFor={id} className={labelStyle}>
        {label}
        {required && <span className="text-[#D1504B]">*</span>}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, { required: validation })}
        placeholder={placeholder}
        className={isDisabled ? isDisabledInputStyle : inputStyle}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
