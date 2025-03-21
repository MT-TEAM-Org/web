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
import { NOTICE_RULES } from "@/constants/noticeRules";

interface FormData {
  boardType: string;
  title: string;
  content: string;
  link: string;
  thumbnail: string;
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

// Base64 to Blob 변환 함수
const base64ToBlob = (base64: string) => {
  const parts = base64.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

// 이미지 처리를 위한 커스텀 확장
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: (element) => {
          // Element를 HTMLImageElement로 타입 체크
          if (!(element instanceof HTMLImageElement)) {
            return null;
          }
          const src = element.src;
          // base64 이미지인 경우 Blob으로 변환
          if (src?.startsWith("data:image")) {
            const blob = base64ToBlob(src);
            const blobUrl = URL.createObjectURL(blob);
            return blobUrl;
          }
          return src;
        },
        renderHTML: (attributes) => {
          return {
            src: attributes.src,
          };
        },
      },
    };
  },
});

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
      CustomImage.configure({
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
          files.forEach((file) => {
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                  editor?.commands.insertContent({
                    type: "image",
                    attrs: { src: result },
                  });
                }
              };
              reader.readAsDataURL(file);
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

            const pos = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            })?.pos;

            if (pos !== undefined) {
              images.forEach((image) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const result = e.target?.result;
                  if (typeof result === "string") {
                    editor
                      ?.chain()
                      .focus()
                      .setTextSelection(pos)
                      .insertContent({
                        type: "image",
                        attrs: { src: result },
                      })
                      .run();
                  }
                };
                reader.readAsDataURL(image);
              });
            }
            return true;
          }
        }
        return false;
      },
    },

    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      const hasContent = html !== "" && html !== "<p></p>";
      const hasImage = html.includes("<img");

      setShowPlaceholder(false);

      if (hasImage) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const images = doc.getElementsByTagName("img");

          let processedHtml = html;
          let firstImageUrl = null;

          for (const [index, img] of Array.from(images).entries()) {
            if (
              img.src.startsWith("data:image") ||
              img.src.startsWith("blob:")
            ) {
              const response = await fetch(img.src);
              const blob = await response.blob();
              const downloadUrl = await onImageUpload(blob);
              processedHtml = processedHtml.replace(img.src, downloadUrl);

              if (index === 0) {
                firstImageUrl = downloadUrl;
              }
            } else if (index === 0 && !firstImageUrl) {
              firstImageUrl = img.src;
            }
          }

          setShowPlaceholder(!hasContent && !hasImage);
          onChange?.(processedHtml);

          if (firstImageUrl) {
            setValue("thumbnail", firstImageUrl);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        setShowPlaceholder(!hasContent && !hasImage);
        onChange?.(html);
        setValue("thumbnail", "");
      }
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
    if (editor) {
      setIsEditorReady(true);
    }
  }, [editor]);

  if (!isEditorReady) {
    return null;
  }

  const listItemClassName =
    "font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray6";

  return (
    <div className="flex flex-col items-center w-full h-full gap-y-4">
      <div className="w-[696px] h-auto flex border flex-col rounded-[5px] border-gray3">
        <div className="flex">
          <label
            htmlFor="videoUrl"
            className="w-[24px] h-[40px] flex items-center justify-center"
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
        <LinkPreview videoUrl={videoUrl} />
        <div className="relative w-full mt-2">
          <Toolbar editor={editor} content={watch("content")} />
          <div className="relative">
            <EditorContent editor={editor} className="w-full" />
            {showPlaceholder && (
              <div
                className="w-full absolute top-2.5 left-0pointer-events-none whitespace-pre-line text-gray7 font-medium text-[14px] leading-[22px] text-left"
                style={{ zIndex: 0 }}
              >
                {showPlaceholder && (
                  <div
                    className="absolute top-0 left-0 pointer-events-none py-2"
                    style={{ zIndex: 0 }}
                  >
                    <p className="font-semibold px-4 text-[14px] leading-[20px] text-gray5">
                      내용을 입력해주세요.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 사용자 안내 */}
      <div className="flex flex-col gap-y-1 w-[696px] min-h-[40px] rounded-[5px] bg-gray1 text-gray6">
        <div className="w-[672px] h-[44px] font-medium text-[14px] leading-[22px] ">
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
      <div className="f w-[696px] h-[40px] flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-[120px] h-[40px] bg-white border border-gray3 rounded-[5px]"
        >
          목록
        </button>
        <button
          type="button"
          onClick={() => {
            if (onSubmit) onSubmit();
          }}
          className="w-[120px] h-[40px] bg-gra text-white rounded-[5px]"
        >
          작성완료
        </button>
      </div>
    </div>
  );
};

export default CustomerTiptap;
