"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Toolbar from "./Toolbar";
import { LinkIcon } from "../icon/LinkIcon";
import { useRouter } from "next/navigation";
import LinkPreview from "../LinkPreview";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { useEditStore } from "@/utils/Store";

interface TiptapProps {
  onChange: (content: string) => void;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  initialContent?: string;
  onImageUpload: (blob: Blob) => Promise<string>;
  setValue: UseFormSetValue<FormData>;
  isPending?: boolean;
}

interface FormData {
  boardType: string;
  categoryType: string;
  title: string;
  content: string;
  link: string;
  thumbnail: string;
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

const Tiptap = ({
  isPending,
  onChange,
  register,
  watch,
  setValue,
  initialContent,
  onImageUpload,
}: TiptapProps) => {
  const router = useRouter();
  const [processingImage, setProcessingImage] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(
    !initialContent || initialContent === "" || initialContent === "<p></p>"
  );
  const { isEditMode } = useEditStore();

  const detectImageAddition = (prevHTML: string, currentHTML: string) => {
    const prevHasImage = prevHTML.includes("<img");
    const currentHasImage = currentHTML.includes("<img");

    // 이전에 이미지가 없었는데 현재 이미지가 있으면 이미지 추가됨
    if (!prevHasImage && currentHasImage) return true;

    // 이미지 태그 개수 비교
    const prevImageCount = (prevHTML.match(/<img/g) || []).length;
    const currentImageCount = (currentHTML.match(/<img/g) || []).length;

    return currentImageCount > prevImageCount;
  };

  const prevHtmlRef = useRef("");

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

      setShowPlaceholder(false);

      // 이미지 처리 중에는 추가 업데이트 무시
      if (processingImage) return;

      // 새 이미지 감지
      if (detectImageAddition(prevHtmlRef.current, html)) {
        setProcessingImage(true); // 이미지 처리 중 상태 설정

        // 이미지 처리 로직 실행
        (async () => {
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
                console.log("downloadUrl", downloadUrl);

                if (index === 0) {
                  firstImageUrl = downloadUrl;
                }
              } else if (index === 0 && !firstImageUrl) {
                firstImageUrl = img.src;
              }
            }

            // 이미지 처리 완료 후 상태 업데이트
            onChange?.(processedHtml);
            prevHtmlRef.current = processedHtml;

            if (firstImageUrl) {
              setValue("thumbnail", firstImageUrl);
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setProcessingImage(false); // 이미지 처리 상태 해제
          }
        })();
      } else {
        // 이미지 추가가 없는 일반 텍스트 업데이트
        // 편집 중인 내용을 저장만 하고 API 호출은 하지 않음
        prevHtmlRef.current = html;

        // 폼 전송 시 사용될 최신 내용 업데이트
        onChange?.(html);
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

  return (
    <div className="w-[720px] min-h-[835px] max-h-full h-auto flex flex-col items-center pt-[12px] pb-[24px] px-[12px]">
      <div>
        <div className="w-[696px] min-h-[40px] flex border flex-col rounded-[5px] border-[#DBDBDB]">
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
        <div className="relative w-full mt-2">
          <Toolbar editor={editor} content={watch("content")} />
          <div className="relative">
            <EditorContent editor={editor} className="w-full" />
            {showPlaceholder && (
              <div
                className="w-full absolute top-2.5 left-0pointer-events-none whitespace-pre-line text-[#424242] font-medium text-[14px] leading-[22px] text-left"
                style={{ zIndex: 0 }}
              >
                {showPlaceholder && (
                  <div
                    className="absolute top-0 left-0 pointer-events-none py-2"
                    style={{ zIndex: 0 }}
                  >
                    <p className="font-semibold px-4 text-[14px] leading-[20px] text-[#424242]">
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
      <div className="flex flex-col gap-y-1 w-[696px] min-h-[40px] rounded-[5px] p-[12px] bg-[#FAFAFA] mt-3 text-[#656565]">
        <div className="w-[672px] h-[44px] font-medium text-[14px] leading-[22px] ">
          <p>
            불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라
            삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을
            수 있습니다.
          </p>
        </div>
        <div className=" w-[672px] h-[88px] font-medium text-[14px] leading-[22px]">
          <p>
            • 허용 확장자 (jpg, jpeg, png,webp,heic, mp4,mov,webm,gif) 총 15개
            까지, 파일당 50MB 까지 업로드 가능합니다.
          </p>
          <p>
            • 50MB보다 더 큰 용량의 영상물은 유튜브 링크 첨부시 재생이
            가능합니다.
          </p>
          <p>• 11MB~50MB 움짤은 11MB 이하로 자동변환됩니다.</p>
          <p>• 음원 있는 움짤/동영상은 45초 이내 길이만 가능합니다.</p>
        </div>
      </div>
      <div className="f w-[696px] h-[40px] flex justify-between mt-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-[120px] h-[40px] bg-[#FFFFFF] border border-[#DBDBDB]"
        >
          목록
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={`w-[120px] h-[40px] rounded-[5px] ${
            isPending ? "bg-gray-500" : "bg-[#00ADEE]"
          } text-[white]`}
        >
          {isEditMode ? "수정완료" : "작성완료"}
        </button>
      </div>
    </div>
  );
};

export default Tiptap;
