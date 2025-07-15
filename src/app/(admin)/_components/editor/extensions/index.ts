import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";

export const getExtensions = (placeholder?: string) => [
  StarterKit,
  Underline,
  Image.configure({
    inline: true,
  }),
  TextStyle,
  Color,
  Placeholder.configure({
    placeholder: placeholder || '내용을 입력해주세요.',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty',
  }),
];
