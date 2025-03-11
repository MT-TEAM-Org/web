import React, { useEffect } from "react";

const report = [
  { label: "회원을 향한 상습비방", value: "abuse" },
  { label: "음란하거나 성적인 게시글", value: "sexual_content" },
  { label: "정치인 관련 게시글", value: "political" },
  { label: "홍보성/불법광고 게시글", value: "advertisement" },
  { label: "기타", value: "etc" },
];

const ReportModalPopUp = ({ setActiveModal }) => {
  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[408px] min-h-[362px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-md">
        <div className="w-full min-h-[38px] flex gap-5 items-center justify-center">
          <p className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-center">
            게시글 신고
          </p>
        </div>
        <div className="w-full min-h-[148px] flex flex-col gap-[12px] justify-start items-center text-[14px] leading-[22px] tracking-[-0.02em] text-gray7">
          <ul className="w-full flex flex-col gap-3">
            {report.map((reason, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  value={reason.value}
                  className="w-[20px] h-[20px] appearance-none border border-gray3 rounded-full checked:bg-black"
                />
                <span>{reason.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full min-h-[48px] flex gap-2 font-bold text-[16px]">
          <button
            onClick={closeModal}
            className="w-[160px] h-auto rounded-[5px] border px-5 py-4 flex gap-[10px] items-center justify-center bg-white border-gray3"
          >
            취소
          </button>
          <button className="w-[160px] h-auto rounded-[5px] border px-5 py-4 flex gap-[10px] items-center justify-center bg-[#00ADEE] text-white">
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModalPopUp;
