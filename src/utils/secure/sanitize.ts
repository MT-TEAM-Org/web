// XSS 방지 유틸 함수

import DOMPurify from "dompurify";

export const cleanContent = (content: string | undefined | null) => {
  if (!content) return "";
  return DOMPurify.sanitize(content);
};