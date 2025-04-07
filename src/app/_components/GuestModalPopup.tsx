import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import usePostInquiry from "@/_hooks/usePostInquiry";
import { useToast } from "@/_hooks/useToast";
import { cn } from "@/utils";
import CustomIcon from "./IconComponents/Icon";

interface GuestModalPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface InquiryData {
  email: string;
  content: string;
}

const GuestModalPopup = ({ show, setShow }: GuestModalPopupProps) => {
  const { success } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryData>();
  const { mutate: postInquiry } = usePostInquiry();

  const onSubmit = (data: InquiryData) => {
    postInquiry(data, {
      onSuccess: () => {
        success(
          "문의가 접수되었습니다.",
          "답변은 적어주신 이메일로 드리겠습니다."
        );
        reset();
      },
    });
    setShow(false);
  };

  const buttonStyle =
    "w-[160px] h-[48px] rounded-[5px] px-5 py-4 flex items-center justify-center text-[16px] font-[700]";

  if (!show) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={() => setShow(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "w-[640px] min-h-[604px] h-auto rounded-[10px] p-10 flex gap-6 flex-col bg-white overflow-hidden items-center justify-center",
          "mobile:h-screen mobile:rounded-none mobile:p-0 mobile:justify-start mobile:gap-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("w-full h-[38px] text-center", "mobile:hidden")}>
          <h1 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em]">
            1:1 문의하기
          </h1>
        </div>
        <div
          className={cn(
            "hidden",
            "mobile:flex mobile:justify-between mobile:items-center mobile:h-[48px] mobile:w-full mobile:border-b-1 mobile:border-gray2"
          )}
        >
          <h1
            className={cn(
              "hidden",
              "mobile:block mobile:font-[700] mobile:leading-[26px] mobile:py-[10px] mobile:pl-[16px]"
            )}
          >
            1:1 문의하기
          </h1>
          <button
            className={cn("hidden", "mobile:block mobile:p-[12px]")}
            onClick={() => setShow(false)}
          >
            <CustomIcon icon="CLOSE_X" className="w-[24px] h-[24px]" />
          </button>
        </div>
        <div
          className={cn(
            "w-full min-h-[390px] flex gap-3 flex-col",
            "mobile:p-[16px]"
          )}
        >
          <div className="w-full min-h-[72px] flex flex-col gap-1">
            <div className="flex gap-[2px]">
              <label
                className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7"
                htmlFor="email"
              >
                연락 받을 이메일 주소
              </label>
              <span className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-warning">
                *
              </span>
            </div>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
              autoFocus
              className="w-full rounded-[5px] min-h-[46px] border px-4 py-3 border-gray3 bg-white"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "유효한 이메일 주소를 입력해주세요",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as="p"
              className="text-warning text-sm"
            />
          </div>

          <div className="w-full min-h-[226px] flex flex-col gap-1">
            <div className="flex gap-[2px]">
              <label
                htmlFor="content"
                className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray7"
              >
                문의 내용
              </label>
              <span className="font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-warning">
                *
              </span>
            </div>
            <textarea
              placeholder="문의 내용을 입력해주세요. (최대 400자 이내)"
              id="content"
              className={cn(
                "resize-none w-full rounded-[5px] min-h-[200px] border px-4 py-3 border-gray3 bg-white",
                "mobile:min-h-[240px]"
              )}
              {...register("content", {
                required: "5자 이상 입력해주세요",
                minLength: { value: 5, message: "5자 이상 입력해주세요" },
                maxLength: {
                  value: 400,
                  message: "최대 400자까지 입력 가능합니다",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="content"
              as="p"
              className="text-warning text-sm"
            />
          </div>

          <div
            className={cn(
              "w-full h-[68px] rounded-[5px] p-3 flex gap-4 bg-gray1 font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray6",
              "mobile:h-[90px]"
            )}
          >
            <p>
              고객님의 문의글은 순차적으로 응답해드리고 있습니다. 최선을 다하는
              플레이 하이브가 되겠습니다. AM 10:00 - PM 7:00 (주말 및 공휴일
              휴무)
            </p>
          </div>
        </div>

        <div
          className={cn(
            "w-full h-[48px] flex gap-2 items-center justify-center",
            "mobile:m-[16px] mobile:px-[16px] mobile:fixed mobile:bottom-0"
          )}
        >
          <button
            type="button"
            className={cn(
              `${buttonStyle} border bg-white border-gray3`,
              "mobile:hidden"
            )}
            onClick={() => setShow(false)}
          >
            취소
          </button>
          <button
            type="submit"
            className={cn(`${buttonStyle} bg-gra text-white`, "mobile:w-full")}
          >
            문의하기
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default GuestModalPopup;
