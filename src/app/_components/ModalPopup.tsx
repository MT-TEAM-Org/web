"use client";

import usePostInquiry from "@/_hooks/usePostInquiry";
import { useForm } from "react-hook-form";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@/_hooks/useToast";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/utils";
import CustomIcon from "./IconComponents/Icon";

interface ModalPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface InquiryData {
  content: string;
}

const ModalPopup = ({ show, setShow }: ModalPopupProps) => {
  const { success } = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading } = useAuthCheck();
  const memberPublicId = show ? data?.data?.data?.publicId : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: postInquiry, isPending } = usePostInquiry();

  const onSubmit = (data: InquiryData) => {
    if (!memberPublicId && !isLoading) return;
    postInquiry(
      { content: data.content, memberPublicId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
          setShow(false);
          success(
            "문의가 접수되었습니다.",
            "문의내역은 마이페이지에서 확인 가능합니다."
          );
        },
      }
    );
  };

  if (!show) return null;

  const buttonStyle =
    "w-[160px] min-h-[48px] rounded-[5px] text-[16px] leading-[16px] font-[700]";
  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      <form
        className={cn(
          "flex flex-col bg-white w-[548px] min-h-[520px] rounded-[10px] p-[40px] shadow-lg text-black",
          "mobile:w-full mobile:h-full mobile:p-0"
        )}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1
          className={cn(
            "text-center text-[24px] font-[700] leading-[38px] mb-[24px]",
            "mobile:hidden"
          )}
        >
          1:1 문의하기
        </h1>
        <div
          className={cn(
            "pc:hidden",
            "tablet:hidden",
            "w-full h-[48px] border-b flex items-center border-gray2"
          )}
        >
          <h1 className="min-w-[312px] w-full py-[10px] px-4 font-bold text-[16px] leading-[26px] tracking-[-0.02em] text-black">
            1:1 문의하기
          </h1>
          <button
            className={cn(
              "pc:hidden",
              "tablet:hidden",
              "w-[48px] h-[48px] p-[14px] flex items-center justify-center"
            )}
            onClick={() => setShow(false)}
          >
            <CustomIcon icon="CLOSE_X" className="w-[24px] h-[24px]" />
          </button>
        </div>
        <div
          className={cn("flex flex-col p-4 h-full", "mobile:justify-between")}
        >
          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-col items-start gap-[4px]",
                "mobile:p-4"
              )}
            >
              <label
                htmlFor="modalTextarea"
                className="text-[14px] leading-[22px] tracking-[-0.02em]"
              >
                문의 내용<span className="text-warning">*</span>
              </label>
              <textarea
                id="modalTextarea"
                placeholder="문의 내용을 입력해주세요."
                className={cn(
                  "resize-none w-full rounded-[5px] min-h-[200px] border px-[12px] py-[16px]",
                  "mobile:min-h-[324px] mobile:h-auto"
                )}
                autoFocus
                style={{ overflow: "hidden", overflowY: "auto" }}
                {...register("content", {
                  required: "`5자 이상 입력해주세요`",
                  minLength: { value: 5, message: "`5자 이상 입력해주세요`" },
                  maxLength: {
                    value: 400,
                    message: "`400자 이내로 입력해주세요`",
                  },
                  validate: (value) =>
                    value.trim().length >= 5 || "`5자 이상 입력해주세요`",
                })}
              />
              <ErrorMessage
                errors={errors}
                name={"content"}
                render={({ message }) => (
                  <p className="text-[14px] text-warning ml-[16px] leading-[22px]">
                    {message}
                  </p>
                )}
              />
            </div>
            <div
              className={cn(
                "p-[12px] bg-gray1 mt-[12px] rounded-[5px]",
                "mobile:p-4 mobile:mt-0"
              )}
            >
              <p className="text-start text-[14px] leading-[22px] text-gray6 tracking-[0.02em]">
                고객님의 문의글은 순차적으로 응답해드리고 있습니다. 최선을
                다하는 플레이 하이브가 되겠습니다. AM 10:00 - PM 7:00 (주말 및
                공휴일 휴무)
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-[8px] mt-[24px]">
            <button
              type="button"
              className={`${buttonStyle} border-gray3 border-[1px] text-gray7 mobile:hidden`}
              onClick={() => setShow(false)}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`${buttonStyle} bg-gra text-white mobile:w-full`}
            >
              문의하기
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ModalPopup;
