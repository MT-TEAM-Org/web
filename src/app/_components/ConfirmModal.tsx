"use client";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  closeText: string;
  confirmText: string;
  isPending: boolean;
}

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  closeText,
  confirmText,
  isPending,
}: ConfirmModalProps) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-[#000000B2] bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-[24px] w-[408px] h-[208px] bg-[#FFFFFF] rounded-[10px] p-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-[4px]">
          <h1 className="font-[700] text-[18px] leading-[28px] text-black">
            {title}
          </h1>
          <p className="leading-[24px] text-gray6">{message}</p>
        </div>

        <div className="flex gap-[8px]">
          <button
            className="flex justify-center items-center w-[160px] h-[48px] rounded-[5px] border-1 border-[#DBDBDB] px-[16px] py-[20px] bg-[#FFFFFF] font-[700] text-gray7"
            onClick={onClose}
          >
            {closeText}
          </button>
          <button
            className="flex justify-center items-center w-[160px] h-[48px] rounded-[5px] px-[16px] py-[20px] bg-[#00ADEE] font-[700] text-[#FFFFFF]"
            onClick={onConfirm}
            disabled={isPending}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
