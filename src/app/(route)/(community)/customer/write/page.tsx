"use client";

import React, { useState } from "react";
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
import {
  useForm,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

interface FormData {
  boardType: string;
  categoryType: string;
  title: string;
  content: string;
  link: string;
  thumbnail: string;
}

const uploadGuidelines = [
  "허용 확장자 (jpg, jpeg, png, webp, heic, mp4, mov, webm, gif) 총 15개까지, 파일당 50MB까지 업로드 가능합니다.",
  "50MB보다 더 큰 용량의 영상물은 유튜브 링크 첨부 시 재생이 가능합니다.",
  "11MB~50MB 움짤은 11MB 이하로 자동 변환됩니다.",
  "음원 있는 움짤/동영상은 45초 이내 길이만 가능합니다.",
];

const Write = () => {
  const router = useRouter();
  const { register, watch, setValue, handleSubmit } = useForm();
  const [videoUrl, setVideoUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link,
      TextStyle,
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
        emptyNodeClass: "text-gray-400 italic", // ✅ 플레이스홀더 스타일 적용
      }),
    ],
    content: "<p>내용을 입력해주세요</p>", // 초기 내용
    editorProps: {
      attributes: {
        class: "editor-class w-full min-h-[224px]",
      },
    },
  });

  return (
    <div className="max-w-[720px] min-h-[648px] max-h-full h-auto flex flex-col  items-center pt-[12px] pb-[24px] px-[12px]">
      <form className="flex flex-col gap-3">
        <h2 className="min-w-[95px]  min-h-[28px] font-bold text-[18px] leading-7 tracking-tighter flex items-center text-[#303030]">
          공지사항 작성
        </h2>
        <div className="max-w-[696px] min-h-[40px] flex flex-col items-start justify-center gap-2.5 border border-[#DBDBDB] rounded-[5px] ">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="px-4 py-2 w-full h-full rounded-md"
          />
        </div>
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
              placeholder="동영상 또는 출처 링크를 입력해주세요."
              className="w-full rounded-md py-[6px] px-[6px]"
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
        </div>
        <LinkPreview videoUrl={videoUrl} />

        <div className="relative w-full ">
          <Toolbar editor={editor} content={watch("content")} />
          <div className=" border-t-0 border rounded-b-[5px] border-[#DBDBDB] w-full h-[244px] px-[16px] py-[12px] ">
            {" "}
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex flex-col gap-y-1 w-[696px] min-h-[40px] rounded-[5px] p-[12px] bg-[#FAFAFA] text-[#656565]">
          <p className="font-medium text-[14px] leading-[22px] ">
            불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라
            삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을
            수 있습니다.
          </p>
          <div className="mx-4 ">
            <ol className="list-disc">
              {uploadGuidelines.map((guideline, index) => (
                <li
                  key={index}
                  className="text-[14px] font-medium leading-[22px] tracking-[-0.03em]"
                >
                  {guideline}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="w-[696px] h-[40px] flex justify-between mt-3">
          <button
            type="button"
            className="w-[120px] h-[40px] bg-[#FFFFFF] border border-[#DBDBDB] rounded-[5px]"
          >
            목록
          </button>
          <button
            type="submit"
            className="w-[120px] h-[40px] bg-[#00ADEE] text-[white] rounded-[5px]"
          >
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
