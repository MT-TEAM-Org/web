import usePostReport from "@/_hooks/fetcher/board/usePostReport";
import { useToast } from "@/_hooks/useToast";
import { ReportReason, ReportType } from "@/services/board/types/report";
import { cn } from "@/utils";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const report = [
  { label: "회원을 향한 상습비방", value: "HARASSMENT" },
  { label: "음란하거나 성적인 게시글", value: "SEXUAL_CONTENT" },
  { label: "정치인 관련 게시글", value: "POLITICAL_CONTENT" },
  { label: "홍보성/불법광고 게시글", value: "PROMOTIONAL_OR_ILLEGAL_ADS" },
  { label: "기타", value: "ETC" },
];

interface ReportModalPopUp {
  setActiveModal: (active: boolean) => void;
  reportData?: {
    reportedPublicId: string;
    reportType: ReportType;
    reportedContentId: number;
  };
}

const ReportModalPopUp = ({ setActiveModal, reportData }: ReportModalPopUp) => {
  const { error } = useToast();
  const { mutate: postReport, isPending } = usePostReport();

  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedReason = formData.get("reportReason") as ReportReason;
    if (!selectedReason) {
      error("신고 사유를 선택해주세요.", "");
      return;
    }
    const data = { ...reportData, reasons: selectedReason };
    postReport(data);
    setActiveModal(false);
  };

  const buttonBaseStyle =
    "w-[160px] h-auto rounded-[5px] border px-5 py-4 flex gap-[10px] items-center justify-center font-bold text-[16px] mobile:h-[36px] mobile:text-[14px] mobile:leading-5";

  return createPortal(
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleReport}
        className={cn(
          "w-[408px] min-h-[362px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-md",
          "mobile:w-[328px] mobile:min-h-[292px] mobile:p-6 mobile:gap-[16px]"
        )}
      >
        <div
          className={cn(
            "w-full min-h-[38px] flex gap-5 items-center justify-center",
            "mobile:min-h-[28px]"
          )}
        >
          <p
            className={cn(
              "font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-center",
              "mobile:text-[18px] mobile:leading-7"
            )}
          >
            게시글 신고
          </p>
        </div>
        <div className="w-full h-[148px] flex flex-col gap-[12px] justify-start items-center text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
          <ul className="w-full h-[148px] flex flex-col gap-3">
            {report.map((reason, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <input
                  id={`reportReason${reason.value}`}
                  type="radio"
                  name="reportReason"
                  value={reason.value}
                  className="w-[20px] h-[20px] appearance-none border border-gray3 rounded-full focus:border-gray3 checked:bg-black checked:border-black checked:relative checked:after:content-[''] checked:after:w-[10px] checked:after:h-[10px] checked:after:bg-white checked:after:rounded-full checked:after:absolute checked:after:inset-0 checked:after:m-auto"
                />
                <label
                  htmlFor={`reportReason${reason.value}`}
                  className="cursor-pointer"
                >
                  {reason.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={cn(
            "w-full min-h-[48px] flex gap-2",
            "mobile:min-h-[36px]"
          )}
        >
          <button
            onClick={closeModal}
            className={`${buttonBaseStyle} bg-white border-gray3`}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`${buttonBaseStyle} bg-gra text-white`}
          >
            신고하기
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default ReportModalPopUp;
