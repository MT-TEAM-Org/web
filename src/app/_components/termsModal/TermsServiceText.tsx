import { memo } from "react";
import termsServiceObject from "@/app/_constants/termsServiceObject";

const TermsServiceText = () => {
  // 원형 번호 문자 매핑
  const getCircledNumber = (number) => {
    const circledNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
    return circledNumbers[number - 1] || number;
  };

  return (
    <div className="text-[14px] leading-[22px] text-gray6">
      <ul className="list-disc">
        {termsServiceObject.sections.map((section) => (
          <li key={section.id}>
            {/* 제목 */}
            {section.title && <div>{section.title}</div>}

            {/* 본문 내용 */}
            {section.content && <div className="ml-2">{section.content}</div>}

            {/* 서브 아이템 (a, b, c, d 등) */}
            {section.subItems && section.subItems.length > 0 && (
              <ul className="list-none ml-2">
                {section.subItems.map((item) => (
                  <li key={item.id} className="flex">
                    <span>{item.id}.</span>
                    <span>{item.content}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 원형 번호 아이템 (①, ②, ③ 등) */}
            {section.circledItems && section.circledItems.length > 0 && (
              <ul className="list-none">
                {section.circledItems.map((item) => (
                  <li key={item.id} className="flex">
                    <span className="mr-1">
                      {getCircledNumber(parseInt(item.id))}
                    </span>
                    <span>{item.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(TermsServiceText);
