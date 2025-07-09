import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { getExtensions } from "./extensions";
import { Toolbar } from "./Toolbar";

interface RichTextEditorProps {
  content?: string;
  placeholder?: string;
}

export const RichTextEditor = ({
  content = "",
  placeholder = "내용을 입력하세요...",
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: getExtensions(placeholder),
    content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  });

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar editor={editor} />
      <div className="w-full flex-1 h-[284px] overflow-y-auto rounded-[5px] rounded-t-none border border-t-0 border-gray3 px-4 py-3">
        <div className="relative">
          <EditorContent
            editor={editor}
            className="[&_.ProseMirror]:min-h-[258px] [&_.ProseMirror]:outline-none"
            data-placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};
