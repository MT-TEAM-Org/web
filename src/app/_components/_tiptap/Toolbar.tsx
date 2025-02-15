import React from "react";
import { Editor, EditorContent } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link,
  Image,
  Heading1,
  Quote,
  Baseline,
} from "lucide-react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TextColorPicker from "./TextColorPicker"; // 텍스트 색상 선택 컴포넌트 import
type Props = {
  editor: Editor | null;
  content: string;
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
    icon: <Image className="w-5 h-5" />,
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
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
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

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full border border-[#ced4da] rounded-t-[5px]">
      <div className="flex justify-start items-center">
        {toolbarButtons.map((button, index) => (
          <React.Fragment key={index}>
            <div className="relative group inline-block text-nowrap">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  button.action(editor);
                }}
                className={`${
                  button.isActive(editor)
                    ? "bg-gray-900 text-white"
                    : "text-black ease-in-out bg-white"
                } p-2 rounded-md font-semibold hover:bg-gray-900 hover:text-white active:translate-y-1`}
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
    </div>
  );
};

export default Toolbar;
