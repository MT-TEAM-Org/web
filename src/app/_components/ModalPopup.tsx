interface ModalPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalPopup = ({ show, setShow }: ModalPopupProps) => {
  if (!show) return null;

  const buttonStyle =
    "w-[160px] min-h-[48px] rounded-[5px] text-[16px] leading-[16px] font-[700] focus:outline-none";
  return (
    <div className="fixed inset-0 bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50">
      <div className="flex flex-col bg-[#FFFFFF] w-[548px] min-h-[520px] rounded-[10px] p-[40px] shadow-lg">
        <h1 className="text-[24px] font-[700] leading-[38px] mb-[24px]">
          1:1 문의하기
        </h1>
        <div className="flex flex-col items-start gap-[4px]">
          <label htmlFor="modalTextarea" className="text-[14px] leading-[22px]">
            문의 내용<span className="text-[#D1504B]">*</span>
          </label>
          <textarea
            id="modalTextarea"
            placeholder="문의 내용을 입력해주세요."
            className="resize-none w-full rounded-[5px] min-h-[200px] border px-[12px] py-[16px] focus:border-[#424242] focus:border-[1px] focus:outline-none"
            style={{ overflow: "hidden", overflowY: "auto" }}
          />
        </div>
        <div className="p-[12px] bg-[#FAFAFA] mt-[12px] rounded-[5px]">
          <p className="text-start text-[14px] leading-[22px] text-[#656565]">
            고객님의 문의글은 순차적으로 응답해드리고 있습니다. 최선을 다하는
            플레이 하이브가 되겠습니다. AM 10:00 - PM 7:00 (주말 및 공휴일 휴무)
          </p>
        </div>

        <div className="flex justify-center gap-[8px] mt-[24px]">
          <button
            type="button"
            className={`${buttonStyle} border-[#DBDBDB] border-[1px]`}
            onClick={() => setShow(false)}
          >
            취소
          </button>
          <button
            type="button"
            className={`${buttonStyle} bg-[#00ADEE] text-white`}
          >
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
