import usePostComment from "@/_hooks/fetcher/news/comment/usePostComment";
import Send_icon from "@/app/_components/icon/Send_icon";
import React, { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import Plus from "@/app/_components/icon/Plus";
import Cancel_icon from "@/app/_components/icon/Cancel_icon";

interface SendCommentBoxProps {
  id?: string;
}

const NewsSendCommentBox = ({ id }: SendCommentBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { mutate: newsPostComment } = usePostComment();
  const maxChars = selectedImage ? 70 : 78;

  const handleContentChange = () => {
    if (textRef.current) {
      let text = textRef.current.innerText;
      if (text.length > maxChars) {
        text = text.slice(0, maxChars);
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        textRef.current.innerText = text;
        if (selection && range && textRef.current) {
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.setStart(
            textRef.current.firstChild || textRef.current,
            Math.min(maxChars, text.length)
          );
          newRange.collapse(true);
          selection.addRange(newRange);
        }
      }
      setInputValue(text);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const response = await getUpload({
        contentType: file.type,
        fileName: `image-${Date.now()}.${file.type.split("/")[1]}`,
      });
      const presignedUrl = response.data.presignedUrl;
      const downloadUrl = response.data.downloadUrl;
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });
      setSelectedImage(downloadUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNewsComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;
    newsPostComment(
      {
        newsId: id ? Number(id) : 0,
        comment: inputValue,
        imgUrl: selectedImage || "",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getNewsComment", String(id)],
          });
          queryClient.invalidateQueries({
            queryKey: ["getNewsInfo", String(id)],
          });
          setInputValue("");
          setSelectedImage(null);
          if (textRef.current) textRef.current.innerText = "";
        },
        onError: (error) => {
          console.error("댓글 추가 실패:", error);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNewsComment(e);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleEditorClick = () => {
    textRef.current?.focus();
    setIsFocused(true);
  };

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.innerText.trim();
      setInputValue(text);
    }
  }, [textRef.current?.innerText]);

  const getEditorHeight = () => {
    return inputValue.length > 39 || selectedImage
      ? "min-h-[68px]"
      : "h-[40px]";
  };

  return (
    <div className="w-full min-h-[72px] p-4 bg-white">
      <form onSubmit={handleNewsComment} className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-4">
          <button
            type="button"
            onClick={handleFileSelect}
            className="w-10 h-10 flex items-center justify-center rounded-[5px] border border-gray2 bg-gray1"
          >
            <Plus />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div ref={containerRef} className="flex-grow max-w-[576px] relative">
            <div
              className={`w-full rounded-[5px] border border-gray7 px-3 py-2 overflow-y-auto max-h-[120px] flex items-center gap-4 ${getEditorHeight()}`}
              onClick={handleEditorClick}
            >
              {selectedImage && (
                <div className="relative flex-shrink-0">
                  <img
                    src={selectedImage}
                    alt="이미지 미리보기"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="w-4 h-4 absolute top-[-8px] right-[-8px] bg-black opacity-70 text-white text-xs flex items-center justify-center rounded-full"
                  >
                    <Cancel_icon />
                  </button>
                </div>
              )}
              <div
                ref={textRef}
                contentEditable
                onInput={handleContentChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="flex-grow outline-none min-w-0"
              />
              {!inputValue.trim() && !selectedImage && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">
                    상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-[5px] border border-gray2 bg-gray1"
          >
            <Send_icon fill={inputValue.trim() ? "#00ADEE" : "#C0C0C0"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsSendCommentBox;
