"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useRouter } from "next/navigation";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { LinkIcon } from "lucide-react";
import LinkPreview from "@/app/_components/LinkPreview";
import Toolbar from "@/app/_components/_tiptap/Toolbar";
import { NOTICE_RULES } from "../_utils/noticeRules";
import { cn } from "@/utils";

interface FormData {
  boardType: string;
  title: string;
  content: string;
  link: string;
  imgUrl: string;
}

interface CustomerTiptapProps {
  onChange: (content: string) => void;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  initialContent?: string;
  onImageUpload: (blob: Blob) => Promise<string>;
  setValue: UseFormSetValue<FormData>;
  onSubmit?: () => void;
}

const isYoutubeLink = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const CustomerTiptap = ({
  onChange,
  register,
  watch,
  setValue,
  initialContent,
  onImageUpload,
  onSubmit,
}: CustomerTiptapProps) => {
  const router = useRouter();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(
    !initialContent || initialContent === "" || initialContent === "<p></p>"
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto mx-auto block",
        },
        allowBase64: true,
        inline: false,
      }),
      TextStyle,
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content: initialContent || "",
    editorProps: {
      attributes: {
        class:
          "editor-class flex flex-col font-semibold text-[14px] leading-[20px] text-gray7 min-h-[375px] p-4 gap-y-[2px]",
      },
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const files = items
          .filter((item) => item.type.indexOf("image") >= 0)
          .map((item) => item.getAsFile());

        if (files.length > 0) {
          event.preventDefault();
          files.forEach(async (file) => {
            if (file) {
              try {
                const url = await onImageUpload(file);
                setValue("imgUrl", url);
              } catch (error) {
                console.error("Image upload failed:", error);
              }
            }
          });
          return true;
        }
        return false;
      },
      handleDrop: (view, event) => {
        const hasFiles = event.dataTransfer?.files?.length;

        if (hasFiles) {
          const images = Array.from(event.dataTransfer.files).filter((file) =>
            file.type.startsWith("image/")
          );

          if (images.length > 0) {
            event.preventDefault();

            images.forEach(async (image) => {
              try {
                const url = await onImageUpload(image);
                setValue("imgUrl", url);
              } catch (error) {
                console.error("Image upload failed:", error);
              }
            });
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const hasContent = html !== "" && html !== "<p></p>";

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const images = doc.getElementsByTagName("img");
      let cleanHtml = html;

      if (images.length > 0) {
        const firstImageSrc = images[0].src;
        if (
          firstImageSrc.startsWith("data:image") ||
          firstImageSrc.startsWith("blob:")
        ) {
          fetch(firstImageSrc)
            .then((res) => res.blob())
            .then((blob) => onImageUpload(blob))
            .then((url) => {
              setValue("imgUrl", url);
            })
            .catch((error) => console.error("Image processing failed:", error));
        } else {
          setValue("imgUrl", firstImageSrc);
        }
        cleanHtml = html.replace(/<img[^>]*>/g, "");
      }

      setShowPlaceholder(!hasContent);
      onChange(cleanHtml);
    },
  });

  useEffect(() => {
    return () => {
      const cleanupBlobUrls = () => {
        const images = document.querySelectorAll('img[src^="blob:"]');
        images.forEach((img) => {
          URL.revokeObjectURL((img as HTMLImageElement).src);
        });
      };
      cleanupBlobUrls();
    };
  }, []);

  useEffect(() => {
    if (videoUrl && editor) {
      editor.commands.setLink({ href: videoUrl });
    }
  }, [videoUrl, editor]);

  const listItemClassName =
    "font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray6";

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div
        className={cn(
          "w-[696px] min-h-[40px] flex border flex-col rounded-[5px] border-[#DBDBDB]",
          "tablet:w-full",
          "mobile:w-full"
        )}
      >
        <div className="flex">
          <label
            htmlFor="videoUrl"
            className="w-[24px] h-[40px] flex items-center justify-center mx-2"
          >
            <LinkIcon />
          </label>
          <input
            {...register("link")}
            type="text"
            id="videoUrl"
            placeholder="동영상 또는 출처링크를 입력해주세요"
            className="w-full rounded-md py-[6px] px-[12px]"
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
      </div>
      <LinkPreview videoUrl={videoUrl} />
      <div className="w-full overflow-hidden">
        <div className="relative w-full mt-3">
          <Toolbar editor={editor} content={watch("content")} />
          <div className="w-full relative border-b border-x rounded-b-[5px]">
            <EditorContent editor={editor} className="w-full" />
            {showPlaceholder && (
              <div
                className="w-full absolute top-2.5 left-0pointer-events-none whitespace-pre-line text-[#424242] font-medium text-[14px] leading-[22px] text-left"
                style={{ zIndex: 0 }}
              >
                {showPlaceholder && (
                  <div
                    className={cn(
                      "absolute top-0 left-0 pointer-events-none py-2",
                      "mobile:min-h-[304px] mobile:rounded-[5px] mobile:px-4 mobile:py-3 mobile:font-medium mobile:leading-[22px] mobile:tracking-[-0.02em]"
                    )}
                    style={{ zIndex: 0 }}
                  >
                    <p
                      className={cn(
                        "font-semibold px-4 text-[14px] leading-[20px] text-[#424242]",
                        "mobile:font-medium"
                      )}
                    >
                      자유롭게 글을 작성해주시되, 국내/해외기사의 경우
                      유의해주세요!
                    </p>
                    <ol className="list-decimal px-8 mt-1">
                      <li className="mb-1">
                        이미지는 이곳에 드래그 드랍으로도 업로드할 수 있습니다.
                      </li>
                      <li className="mb-1">
                        저작권의 영향을 받을 수 있는 국내기사의 경우 반드시
                        요약하여 작성하여야 하며, 기사원문에 있는 내용 복붙,
                        캡쳐 사용을 금지합니다. (원문과 유사 내용이 있으면
                        삭제처리될 수 있음)
                      </li>
                      <li className="mb-1">
                        국내기사의 경우 링크를 올리지 않거나, 기타 공지에 맞지
                        않는 글을 작성하신 경우 무통보 삭제됩니다.
                      </li>
                      <li className="mb-1">
                        개인 SNS 및 블로그 출처를 금지합니다. (페이스북, 인스타,
                        트위터 등)
                      </li>
                      <li className="mb-1">
                        오피셜 기사 작성 시, SNS 출처는 인증된 구단의 계정이라도
                        허용되지 않습니다. 선수 영입/방출 오피셜은 간략하게
                        번역하셔도 되며, 계약기간이나 이적료 같은 기본 사항은
                        기입해주세요.
                      </li>
                      <li className="mb-1">
                        다른 커뮤니티에서 작성된 글이라도 반드시 2차 출처를
                        기입해주세요.
                      </li>
                      <li className="mb-1">
                        다른 사이트에서 기사를 퍼올 시, 해당 기사를 번역한
                        역자에게 허락을 맡아야 합니다. (불펌 시 삭제 처리될 수
                        있음)
                      </li>
                      <li className="mb-1">공식 사이트 글만 사용해주세요.</li>
                      <li className="mb-1">
                        사회적 통념에 위배되거나 분탕 목적의 글은 차단될 수
                        있습니다.
                      </li>
                      <li className="mb-1 ml-2">
                        번역기사 작성 시, 반드시 글 말머리에 언론사를
                        기입해주세요. (예: [BBC], [골닷컴], [르퀴프] 등) 구단의
                        공식홈페이지 출처는 [공홈]이라 기입해 주세요. 번역은
                        핵심 내용이 빠지지 않도록 주의해주시고, 가능하면 전문
                        번역해주세요. 악의적 번역이나 핵심 내용 생략에 대한 문제
                        제기가 있을 수 있습니다. 특히 선수 인터뷰 번역 시,
                        늬앙스가 바뀌지 않게 원문 그대로 번역해주세요.
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 사용자 안내 */}
      <div
        className={cn(
          "flex flex-col gap-y-1 w-full min-h-[160px] rounded-[5px] p-3 bg-gray1 text-gray6 mt-3",
          "tablet:w-full tablet:min-h-[182px]",
          "mobile:hidden"
        )}
      >
        <div
          className={cn(
            "w-full h-[44px] font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray6"
          )}
        >
          <p>
            불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라
            삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을
            수 있습니다.
          </p>
        </div>
        <ol>
          {NOTICE_RULES.map((rule, index) => (
            <li key={index} className={listItemClassName}>
              • {rule}
            </li>
          ))}
        </ol>
      </div>
      {/* 버튼 영역 */}
      <div
        className={cn(
          "w-[696px] h-[40px] flex justify-between mt-3",
          "mobile:w-full"
        )}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className={cn(
            "w-[120px] h-[40px] bg-white border border-gray3 rounded-[5px]",
            "mobile:hidden"
          )}
        >
          목록
        </button>
        <button
          type="button"
          onClick={() => {
            if (onSubmit) onSubmit();
          }}
          className={cn(
            "w-[120px] h-[40px] bg-gra text-white rounded-[5px]",
            "mobile:w-full mobile:h-[48px] mobile:text-center mobile:text-[16px] mobile:font-bold mobile:text-white"
          )}
        >
          작성완료
        </button>
      </div>
    </div>
  );
};

export default CustomerTiptap;
