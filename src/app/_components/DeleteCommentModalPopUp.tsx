import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DeleteCommentModalProps {
  setActiveModal: (active: boolean) => void;
  onDelete: () => void;
}

const DeleteCommentModalPopUp = ({
  setActiveModal,
  onDelete,
}: DeleteCommentModalProps) => {
  const closeModal = () => {
    setActiveModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const baseButtonStyle =
    "w-[160px] h-[48px] rounded-[5px] px-5 py-4 flex gap-[10px] items-center justify-center";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[408px] min-h-[208px] rounded-[10px] p-10 flex flex-col gap-6 bg-white shadow-sm items-center justify-center">
        <div className="w-full min-h-[56px] flex flex-col gap-1 items-center justify-center">
          <p className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
            댓글을 삭제하시겠습니까?
          </p>
          <p className="text-[16px] leading-6 tracking-[-0.02em] text-gray6">
            삭제된 댓글은 복구할 수 없습니다.
          </p>
        </div>
        <div className="w-full min-h-[48px] flex gap-2">
          <button
            onClick={closeModal}
            className={`${baseButtonStyle} border bg-white border-gray3`}
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className={`${baseButtonStyle} text-white bg-[#00ADEE]`}
          >
            네. 삭제할게요.
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteCommentModalPopUp;
