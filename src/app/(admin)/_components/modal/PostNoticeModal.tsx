"use client";

import { cn } from "@/utils";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TextColorPicker from "@/app/_components/_tiptap/TextColorPicker";

interface PostNoticeModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const boxStyle = "w-full flex items-center border-b border-gray2";
const labelStyle =
  "w-[100px] h-full px-3 py-2 bg-gray1 font-bold text-[14px] leading-5 text-gray8 flex items-center justify-center";
const inputStyle =
  "flex-1 px-4 py-2 bg-white text-[14px] leading-5 text-gray8 border border-x-0 border-gray2";

const PostNoticeModal = ({ show, setShow }: PostNoticeModalProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
      }),
      TextStyle,
      Color,
    ],
    content: "",
  });

  if (!show) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShow(false);
  };

  const toolbarButtons = [
    {
      icon: <Bold className="w-5 h-5" />,
      action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
      isActive: (editor: Editor) => editor.isActive("bold"),
      title: "굵게",
    },
    {
      icon: <Italic className="w-5 h-5" />,
      action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
      isActive: (editor: Editor) => editor.isActive("italic"),
      title: "기울임",
    },
    {
      icon: <Strikethrough className="w-5 h-5" />,
      action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
      isActive: (editor: Editor) => editor.isActive("strike"),
      title: "취소선",
    },

    {
      icon: <ImageIcon className="w-5 h-5" />,
      action: (editor: Editor) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              editor
                .chain()
                .focus()
                .setImage({ src: reader.result as string })
                .createParagraphNear()
                .run();
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      },
      isActive: () => false,
      title: "이미지",
    },

    {
      icon: <List className="w-5 h-5" />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleBulletList().run(),
      isActive: (editor: Editor) => editor.isActive("bulletList"),
      title: "글머리 기호 목록",
    },
    {
      icon: <ListOrdered className="w-5 h-5" />,
      action: (editor: Editor) =>
        editor.chain().focus().toggleOrderedList().run(),
      isActive: (editor: Editor) => editor.isActive("orderedList"),
      title: "번호 매기기 목록",
    },
    {
      icon: <HorizontalRuleIcon className="w-5 h-5" />,
      action: (editor: Editor) =>
        editor.chain().focus().setHorizontalRule().run(),
      isActive: (editor: Editor) => editor.isActive("horizontalRule"),
      title: "구분선",
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleClickOutside}
    >
      <form
        action=""
        className="w-[800px] min-h-[670px] rounded-[10px] p-6 bg-white flex flex-col items-center justify-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-[24px] leading-[38px] tracking-[-0.04em] text-black">
          공지사항 등록
        </h3>
        <div className="w-full h-auto border border-gray2">
          <div className={cn(boxStyle, "h-[40px]")}>
            <p className={labelStyle}>작성자</p>
            <p className="flex-1 h-full px-4 py-2 bg-white text-[14px] leading-5 text-gray8">
              플레이하이브 관리자
            </p>
          </div>
          <div className={cn(boxStyle, "h-[56px]")}>
            <p className={labelStyle}>제목</p>
            <div className={inputStyle}>
              <input
                type="text"
                placeholder="내용을 입력해주세요"
                className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
              />
            </div>
          </div>
          <div className={cn(boxStyle, "h-[56px]")}>
            <p className={labelStyle}>첨부링크</p>
            <div className={inputStyle}>
              <input
                type="text"
                placeholder="내용을 입력해주세요"
                className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
              />
            </div>
          </div>
          <div className={cn(boxStyle, "h-full")}>
            <p className={cn(labelStyle, "h-[344px]")}>내용</p>
            <div className="flex-1 h-[344px] px-4 py-2 bg-white flex flex-col items-center justify-center">
              <div className="w-full h-[44px] flex items-center justify-start rounded-[5px] rounded-b-none border border-gray3">
                {toolbarButtons.map((button, index) => (
                  <React.Fragment key={index}>
                    <div className="relative group inline-block text-nowrap">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (editor) {
                            button.action(editor);
                          }
                        }}
                        className={`${
                          editor && button.isActive(editor)
                            ? "bg-gray-900 text-white"
                            : "text-black ease-in-out bg-white"
                        } p-2 rounded-[5px] font-semibold hover:bg-gray-900 hover:text-white active:translate-y-1`}
                      >
                        {button.icon}
                      </button>

                      <div className="absolute left-5 -translate-x-1/2 hidden group-hover:block bg-black text-white z-50 text-xs px-2 py-2 rounded shadow-lg mt-1">
                        {button.title}
                        <div className="absolute -top-0.5 bottom-0 left-1/2 -translate-x-1/2 w-2 border-black border-r-4 border-t-4 h-2 -rotate-45"></div>
                      </div>
                    </div>
                    {index === 4 || index === 8 ? (
                      <div className="w-px bg-gray-300 h-6"></div>
                    ) : null}
                  </React.Fragment>
                ))}
                <TextColorPicker editor={editor} />
              </div>
              <div className="w-full flex-1 h-[284px] overflow-y-auto rounded-[5px] rounded-t-none border border-t-0 border-gray3 px-4 py-3">
                <EditorContent editor={editor} className="h-[260px]" />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-[120px] h-[40px] rounded-[5px] px-4 py-[13px] flex items-center justify-center bg-gra font-bold text-[14px] text-white"
        >
          등록
        </button>
      </form>
    </div>,
    document.body
  );
};

export default PostNoticeModal;
