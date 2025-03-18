"use client";

import React, { FocusEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "@/app/_components/_tiptap/Toolbar";
import LinkPreview from "@/app/_components/LinkPreview";
import { LinkIcon } from "@/app/_components/icon/LinkIcon";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useForm } from "react-hook-form";
import Underline from "@tiptap/extension-underline";
import usePostNotice from "@/_hooks/fetcher/customer/usePostNotice";

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
          if (!(element instanceof HTMLImageElement)) {
            return null;
          }
          const src = element.src;
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

const Write = () => {
  const router = useRouter();
  const { register, watch, setValue, handleSubmit } = useForm();
  const { mutate: postNotice } = usePostNotice();
  const [videoUrl, setVideoUrl] = useState("");

  const onSubmit = (data: any) => {
    postNotice({
      title: data.title,
      content: data.content,
      imgUrl: data.imgUrl,
    });
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link,
      Underline,
      TextStyle,
      CustomImage.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto mx-auto block",
        },
        allowBase64: true,
        inline: false,
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        placeholder: "여기에 내용을 입력하세요...",
        emptyNodeClass: "text-gray-400 italic",
      }),
    ],
    content: "<p>내용을 입력해주세요</p>",
    editable: false,
    editorProps: {
      attributes: {
        class: "border border-gray-300 rounded-lg",
        contenteditable: "true",
      },
    },
  });

  const buttonBaseStyle =
    "w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex gap-[10px] font-bold text-[14px] items-center justify-center";

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.textContent === "") {
      target.textContent = "내용을 입력해주세요";
      target.style.color = "#9CA3AF";
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(target, 0);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  // 중복된 ol 항목을 객체 배열로 정리
  const noticeRules = [
    "허용 확장자 (jpg, jpeg, png,webp,heic, mp4,mov,webm,gif) 총 15개 까지, 파일당 50MB 까지 업로드 가능합니다.",
    "50MB보다 더 큰 용량의 영상물은 유튜브 링크 첨부시 재생이 가능합니다.",
    "11MB~50MB 움짤은 11MB 이하로 자동변환됩니다.",
    "음원 있는 움짤/동영상은 45초 이내 길이만 가능합니다.",
  ];

  const listItemClassName =
    "font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray6";

  return (
    <div className="w-[720px] min-h-[648px] h-auto flex flex-col justify-center items-center bg-white shadow-sm rounded-[5px] border px-3 pt-3 pb-6 gap-3 mb-10">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="w-[95px] min-h-[28px] flex gap-3 font-bold text-[18px] leading-7 tracking-[-0.72px] items-center text-gray8">
          공지사항 작성
        </h2>
        <div className="w-full h-[40px] flex items-center justify-center gap-5 border border-gray3 rounded-[5px]">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="제목을 입력해주세요."
            className="px-4 py-2 w-full h-full rounded-md placeholder:text-gray5"
          />
        </div>
        <div className="w-full h-[40px] flex border flex-col rounded-[5px] border-gray3">
          <div className="flex">
            <label
              htmlFor="videoUrl"
              className="w-[24px] h-[40px] flex items-center justify-center mx-2"
            >
              <LinkIcon />
            </label>
            <input
              {...register("imgUrl")}
              type="text"
              id="videoUrl"
              placeholder="동영상 또는 출처 링크를 입력해주세요."
              className="w-full rounded-md py-[6px] px-[6px] placeholder:text-gray4"
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
        </div>
        <LinkPreview videoUrl={videoUrl} />

        <div className="relative w-[696px] min-h-[244px]">
          <Toolbar editor={editor} content={watch("content")} />
          <div className="border-t-0 border rounded-b-[5px] border-gray3 w-full h-auto px-[16px] py-[12px]">
            <div
              className="w-full min-h-[176px] flex gap-[10px] outline-none font-medium text-[14px] leading-[22px] tracking-[-0.02em] text-gray5"
              contentEditable="true"
              suppressContentEditableWarning={true}
              data-placeholder="내용을 입력해주세요"
              onFocus={(e: FocusEvent<HTMLDivElement>) => {
                if (e.target.textContent === "내용을 입력해주세요") {
                  e.target.textContent = "";
                  e.target.style.color = "#000";
                }
              }}
              onBlur={(e: FocusEvent<HTMLDivElement>) => {
                if (e.target.textContent === "") {
                  e.target.textContent = "내용을 입력해주세요";
                  e.target.style.color = "#9CA3AF";
                }
                setValue("content", e.target.textContent);
              }}
              onInput={(e) => setValue("content", e.currentTarget.textContent)}
            >
              내용을 입력해주세요
            </div>
          </div>
        </div>

        <div className="w-full h-[160px] rounded-[5px] flex flex-col gap-1 p-3 bg-gray1 text-gray6">
          <p className="font-medium text-[14px] leading-[22px] tracking-[-0.02em]">
            불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라
            삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을
            수 있습니다.
          </p>
          <ol>
            {noticeRules.map((rule, index) => (
              <li key={index} className={listItemClassName}>
                • {rule}
              </li>
            ))}
          </ol>
        </div>

        <div className="w-[696px] h-[40px] flex justify-between">
          <button
            type="button"
            className={`${buttonBaseStyle} border border-gray3 bg-white text-gray7`}
          >
            목록
          </button>
          <button
            type="submit"
            className={`${buttonBaseStyle} bg-gra text-white`}
          >
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
