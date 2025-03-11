"use client";

import { Checkbox } from "@/app/_components/icon/Checkbox";
import { CheckboxNull } from "@/app/_components/icon/CheckboxNull";
import changeURLParams from "../util/changeURLParams";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const AnswerCheck = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const answerChecked = searchParams.get("order_type");

  const setAnswerChecked = (checked: boolean) => {
    router.push(
      changeURLParams(searchParams, "order_type", checked ? "ANSWERED" : "")
    );
  };

  return (
    <div className="flex items-center gap-[8px] h-[20px]">
      <input
        type="checkbox"
        className="hidden"
        id="checkbox"
        checked={answerChecked === "ANSWERED" ? true : false}
        onChange={() => setAnswerChecked(!answerChecked)}
      />
      <label htmlFor="checkbox" className="cursor-pointer">
        {answerChecked ? <Checkbox size={20} /> : <CheckboxNull size={20} />}
      </label>
      <label
        className="text-[14px] leading-[20px] text-gray7 select-none cursor-pointer"
        htmlFor="checkbox"
      >
        답변 완료
      </label>
    </div>
  );
};

export default AnswerCheck;
