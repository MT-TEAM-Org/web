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
  isError?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  helpText = "",
  placeholder = "",
  height,
  type = "text",
  id,
  register,
  isDisabled = false,
  isError = false,
}) => {
  const inputStyle = `h-[${height}px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6] focus:border-[#424242] focus:border-[1px] focus:outline-none`;
  const labelStyle = "text-[14px] leading-[22px] text-[#424242]";
  const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
  const isErrorTextStyle = helpTextStyle + " text-[#D1504B]";
  return (
    <div className="flex flex-col gap-[4px]">
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, { required: true })}
        placeholder={placeholder}
        className={isDisabled ? isDisabledInputStyle : inputStyle}
        disabled={isDisabled}
      />
      {helpText && (
        <p
          className={
            isDisabled
              ? isDisabledHelpTextStyle
              : isError
              ? isErrorTextStyle
              : helpTextStyle
          }
        >
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Input;
