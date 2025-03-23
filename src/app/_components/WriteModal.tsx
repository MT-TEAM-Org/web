"use client";
import { useEffect, useState } from "react";

interface WritGuideProps {
  modalId: string;
  forceShow?: boolean;
  onClose?: () => void;
}

const WriteModal = ({
  modalId = `write-modal`,
  forceShow = false,
  onClose,
}: WritGuideProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
    } else {
      if (typeof window !== "undefined") {
        const hasSeenModal = localStorage.getItem(`modal-${modalId}-seen`);
        if (!hasSeenModal) {
          setIsVisible(true);
        }
      }
    }
  }, [modalId, forceShow]);

  const handleDontShowAgain = () => {
    localStorage.setItem(`modal-${modalId}-seen`, `true`);
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  if (!isVisible) return null;

  const buttonBoxSize =
    "flex justify-center items-center w-[160px] max-h-[48px] py-[16px] px-[20px] border-1 rounded-[5px]";

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center bg-white w-[640px] h-[656px] rounded-[10px] p-[40px]">
        <h3 className="mb-[16px] w-[560px] min-h-[38px] font-[700] text-[24px] leading-[38px] text-center">
          글쓰기 유의사항
        </h3>
        <ol className="flex flex-col bg-gray1 rounded-[5px]  list-decimal list-inside w-[560px] min-h-[450px] font-[500] text-[14px] leading-[22px] text-gray6 p-[16px]">
          <li>이미지는 이곳에 드래그 드랍으로도 업로드할 수 있습니다.</li>
          <li>
            저작권의 영향을 받을 수 있는 국내기사의 경우 반드시 요약하여
            작성하여야 하고, 기사원문에 있는 내용 복붙, 캡쳐 사용을 금지합니다.
            (원문과 유사 내용이 있으면 삭제처리될 수 있음) (최소 3줄)
          </li>
          <li>
            국내기사의 경우 링크를 올리지 않다거나, 기타 공지에 맞지 않는 글을
            작성하신 경우 무통보삭제됩니다
          </li>
          <li>
            개인 SNS 및 블로그 출처를 금지합니다. (페이스북, 인스타, 트위터 등)
          </li>
          <li>
            오피셜 기사 작성시, SNS 출처는 인증된 구단의 계정이라도 허용되지
            않습니다 선수 영입/방출 오피셜은 간략하게 번역하셔도 됩니다, 허나
            계약기간이나 이적료같은 기본 사항은 기입해주세요
          </li>
          <li>다른 커뮤니티에서 작성 된 글이라도 꼭 2차 출처 기입해주세요.</li>
          <li>
            다른 사이트에서 기사를 퍼올시 반드시 해당 기사를 번역한 역자에게
            허락을 맡아야합니다. (만일 불펌인게 보이면 삭제)
          </li>
          <li>공식 사이트 글만 들고 와주시길 바랍니다.</li>
          <li>
            사회적인 통념에 위배되거나 싸움을 야기하는 분탕 목적 발견시 차단될
            수 있습니다.{" "}
          </li>
          <li>
            번역기사 작성시 반드시 글 말머리에 언론사를 기입해주세요, ex) [BBC],
            [골닷컴], [르퀴프] 등등.구단의 공식홈페이지 출처는 [공홈] 이라 기입.
            번역은 핵심 내용 빠지지 않게 주의해주시고, 되도록이면 전문
            번역해주세요. 악의적 번역 혹은 핵심 내용 생략에 관해 문제 제기가 될
            수 있기 때문입니다. 특히 선수 인터뷰 번역할때 늬앙스가 바뀌지 않게
            최대한 원문 번역해주세요.
          </li>
        </ol>
        <div className="w-[560px] min-h-[48px] flex justify-center items-center gap-x-[8px] mt-[24px]">
          <button
            onClick={handleDontShowAgain}
            className={`${buttonBoxSize} bg-white`}
          >
            다시 보지 않기
          </button>
          <button
            onClick={handleConfirm}
            className={`${buttonBoxSize} bg-primary text-white`}
          >
            확인했어요!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
