import React from "react";
import { Editor } from "@tiptap/react";
import { ToolbarButton } from "./ToolbarButton";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
} from "lucide-react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TextColorPicker from "@/app/_components/_tiptap/TextColorPicker";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
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

  if (!editor) return null;

  return (
    <div className="w-full h-[44px] flex items-center justify-start rounded-[5px] rounded-b-none border border-gray3 px-1">
      {toolbarButtons.map((button, index) => (
        <React.Fragment key={index}>
          <ToolbarButton
            icon={button.icon}
            action={button.action}
            isActive={button.isActive}
            title={button.title}
            editor={editor}
          />
          {(index === 3 || index === 6) && (
            <hr className="w-[1px] h-6 bg-gray3" />
          )}
        </React.Fragment>
      ))}
      <TextColorPicker editor={editor} />
    </div>
  );
};
