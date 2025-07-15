import React from "react";
import { Editor } from "@tiptap/react";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  title: string;
  editor: Editor | null;
}

export const ToolbarButton = ({
  icon,
  action,
  isActive,
  title,
  editor,
}: ToolbarButtonProps) => {
  if (!editor) return null;

  return (
    <div className="relative group inline-block text-nowrap">
      <button
        onClick={(e) => {
          e.preventDefault();
          action(editor);
        }}
        className={`${
          isActive(editor)
            ? "bg-gray-900 text-white"
            : "text-black ease-in-out bg-white"
        } p-2 rounded-[5px] font-semibold hover:bg-gray-900 hover:text-white active:translate-y-1`}
      >
        {icon}
      </button>

      <div className="absolute left-5 -translate-x-1/2 hidden group-hover:block bg-black text-white z-50 text-xs px-2 py-2 rounded shadow-lg mt-1">
        {title}
        <div className="absolute -top-0.5 bottom-0 left-1/2 -translate-x-1/2 w-2 border-black border-r-4 border-t-4 h-2 -rotate-45"></div>
      </div>
    </div>
  );
};
