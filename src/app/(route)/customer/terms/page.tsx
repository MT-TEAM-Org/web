import termsServiceObject from "@/constants/termsServiceObject";
import React from "react";

const TermsOfService = () => {
  const getCircledNumber = (number: number) => {
    const circledNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
    return circledNumbers[number - 1] || number;
  };

  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm">
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center border-gray2 bg-white sticky top-0 z-10">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">이용약관</h1>
      </div>
      <div className="text-[14px] leading-[22px] tracking-[-0.02em] flex flex-col justify-between text-gray6 p-3">
        <ul>
          {termsServiceObject.sections.map((section) => (
            <li key={section.id} className="relative pl-4">
              <span className="absolute left-0 top-0">• </span>
              {section.title && <div>{section.title}</div>}

              {section.content && <div>{section.content}</div>}

              {section.subItems && section.subItems.length > 0 && (
                <ul>
                  {section.subItems.map((item) => (
                    <li key={item.id} className="relative pl-4">
                      <span className="absolute left-0 top-0">{item.id}. </span>
                      <span>{item.content}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.circledItems && section.circledItems.length > 0 && (
                <ul>
                  {section.circledItems.map((item) => (
                    <li key={item.id} className="relative pl-4">
                      <span className="absolute left-0 top-0">
                        {getCircledNumber(parseInt(item.id))}.
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
    </div>
  );
};

export default TermsOfService;
