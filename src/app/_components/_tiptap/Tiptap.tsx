"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Placeholder } from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Youtube from "@tiptap/extension-youtube";
import Toolbar from "./Toolbar";
import TitleDag from "./TitleDag";
import { LinkIcon } from "../icon/LinkIcon";

interface TiptapProps {
  onChange: (content: string) => void;
  content?: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onChange, content }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
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
        placeholder:
          "자유롭게 글을 작성해주시되, 국내/해외기사의 경우 유의해주세요!\n\n" +
          "1. 이미지는 이곳에 드래그 드랍으로도 업로드할 수 있습니다.\n" +
          "2. 저작권의 영향을 받을 수 있는 국내기사의 경우 반드시 요약하여 작성하여야 하며, 기사원문에 있는 내용 복붙, 캡쳐 사용을 금지합니다. (원문과 유사 내용이 있으면 삭제처리될 수 있음)\n" +
          "3. 국내기사의 경우 링크를 올리지 않거나, 기타 공지에 맞지 않는 글을 작성하신 경우 무통보 삭제됩니다.\n" +
          "4. 개인 SNS 및 블로그 출처를 금지합니다. (페이스북, 인스타, 트위터 등)\n" +
          "5. 오피셜 기사 작성 시, SNS 출처는 인증된 구단의 계정이라도 허용되지 않습니다. 선수 영입/방출 오피셜은 간략하게 번역하셔도 되며, 계약기간이나 이적료 같은 기본 사항은 기입해주세요.\n" +
          "6. 다른 커뮤니티에서 작성된 글이라도 반드시 2차 출처를 기입해주세요.\n" +
          "7. 다른 사이트에서 기사를 퍼올 시, 해당 기사를 번역한 역자에게 허락을 맡아야 합니다. (불펌 시 삭제 처리될 수 있음)\n" +
          "8. 공식 사이트 글만 사용해주세요.\n" +
          "9. 사회적 통념에 위배되거나 분탕 목적의 글은 차단될 수 있습니다.\n" +
          "10. 번역기사 작성 시, 반드시 글 말머리에 언론사를 기입해주세요. (예: [BBC], [골닷컴], [르퀴프] 등) 구단의 공식홈페이지 출처는 [공홈]이라 기입해 주세요. 번역은 핵심 내용이 빠지지 않도록 주의해주시고, 가능하면 전문 번역해주세요. 악의적 번역이나 핵심 내용 생략에 대한 문제 제기가 있을 수 있습니다. 특히 선수 인터뷰 번역 시, 늬앙스가 바뀌지 않게 원문 그대로 번역해주세요.",
        emptyNodeClass:
          " hidden-placeholder first:before:text-black pointer-events-none before:text-[16px] first:before:h-0 before:float-left  first:before:content-[attr(data-placeholder)] focus:before:content-['']",
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "editor-classflex flex-col min-h-[550px] overflow-y-auto box-border px-4 py-3 justify-start border-r border-l border-b border-[#ced4da] text-black items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none scroll",
      },
      handleDOMEvents: {
        focus: () => {
          if (placeholderVisible) {
            setPlaceholderVisible(false);
            editor?.commands.setContent("");
          }
          return false;
        },
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const addVideoToEditor = () => {
    if (videoUrl && editor) {
      editor.commands.setYoutubeVideo({
        src: videoUrl,
        width: 640,
        height: 360,
      });
      setVideoUrl("");
    }
  };

  useEffect(() => {
    if (editor) {
      setIsEditorReady(true);
    }
  }, [editor]);

  if (!isEditorReady) {
    return null;
  }

  return (
    <div className="w-[720px] min-h-[835px] flex flex-col items-center pt-[12px] pb-[24px] px-[12px]">
      <div className="">
        <TitleDag />
        <div className="w-[696px] min-h-[40px] flex mt-5 border flex-col rounded-[5px] border-[#ced4da]">
          <div className="flex">
            <label
              htmlFor="videoUrl"
              className="w-[24px] h-[40px] flex items-center justify-center mx-2"
            >
              <LinkIcon />
            </label>
            <input
              type="text"
              id="videoUrl"
              placeholder="동영상 또는 출처링크를 입력해주세요"
              className="w-full rounded-md py-[6px] px-[12px] "
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2">
          <Toolbar editor={editor} content={content || ""} />
          <EditorContent editor={editor} />
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
        <div className="w-[672px] h-[88px] font-medium text-[14px] leading-[22px]">
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
      <div className="w-[696px] h-[40px] flex justify-between mt-3">
        <button className="w-[120px] h-[40px] bg-[#FFFFFF] border border-[#DBDBDB]">
          목록
        </button>
        <button className="w-[120px] h-[40px] bg-[#00ADEE] text-[white] rounded-[5px]">
          작성완료
        </button>
      </div>
    </div>
  );
};

export default Tiptap;
