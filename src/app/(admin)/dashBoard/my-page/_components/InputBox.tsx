"use client";

import { cn } from "@/utils";
import React, { useState } from "react";
import { inputFields } from "../_constants/INPUT_FIELDS";

const InputBox = () => {
  const [form, setForm] = useState({
    password: "",
    nickname: "",
  });

  return (
    <>
      {inputFields.map((item) => (
        <div
          key={item.name}
          className={cn(
            "w-full flex flex-col items-start justify-center gap-1",
            item.description ? "h-[100px]" : "h-[74px]"
          )}
        >
          <label
            htmlFor={item.name}
            className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7"
          >
            {item.label}
            <span className="text-warning">*</span>
          </label>

          <input
            id={item.name}
            name={item.name}
            type={item.type}
            placeholder={item.placeholder}
            readOnly={item.readOnly}
            value={item.readOnly ? item.value : form[item.name]}
            onChange={
              item.readOnly
                ? undefined
                : (e) => setForm({ ...form, [item.name]: e.target.value })
            }
            className={cn(
              "w-full h-[48px] rounded-[5px] border px-4 py-3 border-gray3",
              item.readOnly
                ? "text-gray5 bg-gray2 outline-none focus:outline-none focus:border-none cursor-default select-none"
                : "text-gray2 bg-white"
            )}
          />
          {/* 설명 */}
          {item.description && (
            <p className="px-4 font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray5">
              {item.description}
            </p>
          )}
        </div>
      ))}
      <button
        className={cn(
          "w-[120px] h-[40px] rounded-[5px] px-4 bg-Primary",
          "font-bold text-[14px] text-white"
        )}
      >
        수정 완료
      </button>
    </>
  );
};

export default InputBox;
