"use client";

import usePostInquiry from "@/_hooks/usePostInquiry";
import { useForm } from "react-hook-form";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@/_hooks/useToast";

interface ModalPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface InquiryData {
  content: string;
}

const ModalPopup = ({ show, setShow }: ModalPopupProps) => {
  const { success } = useToast();
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
  return (
    <div
      className="fixed inset-0 bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50 mt-0"
      onClick={() => setShow(false)}
    >
      <form
        className="flex flex-col bg-[#FFFFFF] w-[548px] min-h-[520px] rounded-[10px] p-[40px] shadow-lg text-[#000000]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-[24px] font-[700] leading-[38px] mb-[24px]">
          1:1 문의하기
        </h1>
        <div className="flex flex-col items-start gap-[4px]">
          <label htmlFor="modalTextarea" className="text-[14px] leading-[22px]">
            문의 내용<span className="text-[#D1504B]">*</span>
          </label>
          <textarea
            id="modalTextarea"
            placeholder="문의 내용을 입력해주세요."
            className="resize-none w-full rounded-[5px] min-h-[200px] border px-[12px] py-[16px]"
            style={{ overflow: "hidden", overflowY: "auto" }}
            {...register("content", {
              required: "`5자 이상 입력해주세요`",
              minLength: { value: 5, message: "`5자 이상 입력해주세요`" },
              validate: (value) =>
                value.trim().length >= 5 || "`5자 이상 입력해주세요`",
            })}
          />
          <ErrorMessage
            errors={errors}
            name={"content"}
            render={({ message }) => (
              <p className="text-[14px] text-[#D1504B] ml-[16px] leading-[22px]">
                {message}
              </p>
            )}
          />
        </div>
        <div className="p-[12px] bg-[#FAFAFA] mt-[12px] rounded-[5px]">
          <p
            className="text-start text-[14px] leading-[22px] text-[#656565]"
            style={{ letterSpacing: "-0.2px" }}
          >
            고객님의 문의글은 순차적으로 응답해드리고 있습니다. 최선을 다하는
            플레이 하이브가 되겠습니다. AM 10:00 - PM 7:00 (주말 및 공휴일 휴무)
          </p>
        </div>

        <div className="flex justify-center gap-[8px] mt-[24px]">
          <button
            type="button"
            className={`${buttonStyle} border-[#DBDBDB] border-[1px] text-gray7`}
            onClick={() => setShow(false)}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`${buttonStyle} bg-[#00ADEE] text-white`}
          >
            문의하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalPopup;
