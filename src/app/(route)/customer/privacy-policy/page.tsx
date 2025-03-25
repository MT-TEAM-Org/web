import termsPersonalObject from "@/constants/termsPersonalObject";
import React from "react";

const Page = () => {
  return (
    <div className="w-[720px] h-auto rounded-[5px] border-b bg-white flex flex-col shadow-sm mb-10">
      <div className="w-full min-h-[64px] border-b p-4 flex justify-between items-center sticky top-0 z-10 border-gray2 bg-white">
        <h1 className="font-bold text-[18px] leading-7 text-gray8">
          개인정보 취급방침
        </h1>
      </div>
      <div className="text-[14px] leading-[22px] text-gray6 p-3">
        {termsPersonalObject.sections.map((section) => (
          <div key={section.id}>
            <div>
              {!isNaN(Number(section.id)) && <span>{section.id}. </span>}
              {isNaN(Number(section.id)) &&
                typeof section.id === "string" &&
                section.id.length === 1 &&
                /[a-zA-Z]/.test(section.id) && <span>{section.id}. </span>}
              {typeof section.id === "string" &&
                section.id.startsWith("disc-") && <span>• </span>}
              <span>{section.title}</span>
            </div>
            {section.content &&
              Array.isArray(section.content) &&
              section.content.map((contentItem, index) => (
                <div key={contentItem.id || index} className="ml-2">
                  <div>
                    {contentItem.id && contentItem.id.startsWith("disc-") && (
                      <span>• </span>
                    )}
                    {contentItem.id &&
                      !contentItem.id.startsWith("disc-") &&
                      contentItem.id.length === 1 &&
                      /[a-zA-Z]/.test(contentItem.id) && (
                        <span>{contentItem.id}. </span>
                      )}

                    {contentItem.title && <span>{contentItem.title}</span>}

                    {typeof contentItem.content === "string" && (
                      <span>{contentItem.content}</span>
                    )}
                  </div>

                  {contentItem.content &&
                    Array.isArray(contentItem.content) &&
                    contentItem.content.map((subItem, subIndex) => (
                      <div key={subItem.id || subIndex} className="ml-2">
                        <div>
                          {subItem.id && subItem.id.startsWith("disc-") && (
                            <span>• </span>
                          )}
                          {subItem.id &&
                            !subItem.id.startsWith("disc-") &&
                            subItem.id.length === 1 &&
                            /[a-zA-Z]/.test(subItem.id) && (
                              <span>{subItem.id}. </span>
                            )}

                          {subItem.title && <span>{subItem.title}</span>}

                          {typeof subItem.content === "string" && (
                            <span>{subItem.content}</span>
                          )}
                        </div>

                        {subItem.content &&
                          Array.isArray(subItem.content) &&
                          subItem.content.map((deepItem, deepIndex) => (
                            <div
                              key={deepItem.id || deepIndex}
                              className="ml-2"
                            >
                              <div>
                                {deepItem.id &&
                                  deepItem.id.startsWith("disc-") && (
                                    <span>• </span>
                                  )}
                                {deepItem.id &&
                                  !deepItem.id.startsWith("disc-") &&
                                  deepItem.id.length === 1 &&
                                  /[a-zA-Z]/.test(deepItem.id) && (
                                    <span>{deepItem.id}. </span>
                                  )}

                                {deepItem.title && (
                                  <span>{deepItem.title}</span>
                                )}

                                {typeof deepItem.content === "string" && (
                                  <span>{deepItem.content}</span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
