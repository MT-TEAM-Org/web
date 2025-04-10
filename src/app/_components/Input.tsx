"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  helpText?: string;
  placeholder?: string;
  height: number;
  gap?: number;
  type?: string;
  id: string;
  register: UseFormRegister<any>;
  isDisabled?: boolean;
  defaultValue?: string;
  validation?: RegisterOptions;
  required?: boolean;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder = "",
  height,
  gap = 2,
  type = "text",
  id,
  register,
  isDisabled = false,
  validation,
  required = true,
  autoFocus = false,
}) => {
  const inputStyle = `h-[${height}px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]`;
  const labelStyle = "text-[14px] leading-[22px] text-[#424242]";
  const isDisabledInputStyle =
    inputStyle + " bg-[#EEEEEE] border-[#DBDBDB] text-[#A6A6A6]";
  return (
    <div className={`flex flex-col gap-[${gap}px]`}>
      <label htmlFor={id} className={labelStyle}>
        {label}
        {required && <span className="text-[#D1504B]">*</span>}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={isDisabled ? isDisabledInputStyle : inputStyle}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
