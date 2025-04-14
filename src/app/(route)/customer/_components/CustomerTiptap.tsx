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
import { guideItems, NOTICE_RULES } from "../_utils/noticeRules";
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
  writeType: string;
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
  writeType,
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
        <div className="relative w-full mt-3 border border-t-0 rounded-[5px]">
          <Toolbar editor={editor} content={watch("content")} />
          <div
            className={cn(
              "w-full relative",
              "mobile:overflow-y-auto mobile:max-h-[320px]"
            )}
          >
            <EditorContent editor={editor} className="w-full" />
            {showPlaceholder && (
              <div className="absolute top-0 left-0 pointer-events-none py-2 flex flex-col gap-[2px] w-full">
                {writeType === "feedback" ? (
                  <p className="font-bold text-[14px] leading-5 px-4 text-gray7 mobile:font-medium">
                    자유롭게 글을 작성해주시되, 국내/해외기사의 경우
                    유의해주세요!
                  </p>
                ) : (
                  <p className="px-4 pt-2 text-[14px] leading-[22px] tracking-[-0.02em] text-gray5">
                    내용을 입력해주세요.
                  </p>
                )}
                {writeType === "feedback" && (
                  <ol className="flex flex-col gap-[2px] text-[14px] leading-[22px] tracking-[-0.02em] text-gray7 list-decimal px-8">
                    {guideItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
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
      <div className={cn("w-full h-[40px] flex justify-between mt-3")}>
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
