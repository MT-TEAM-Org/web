import usePostComment from "@/_hooks/fetcher/news/comment/usePostComment";
import Send_icon from "@/app/_components/icon/Send_icon";
import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import Plus from "@/app/_components/icon/Plus";

interface SendCommentBoxProps {
  id?: string;
}

const NewsSendCommentBox = ({ id }: SendCommentBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: newsPostComment } = usePostComment();

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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        },
        onError: (error) => {
          console.error("댓글 추가 실패:", error);
        },
      }
    );
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const lines = value.split("\n");

    if (lines.length > 2) {
      setInputValue(lines.slice(0, 2).join("\n"));
      return;
    }

    const maxChars = 78;
    if (value.length > maxChars) {
      setInputValue(value.slice(0, maxChars));
      return;
    }

    setInputValue(value);
  };

  const textareaHeight = inputValue.length > 40 ? "h-[68px]" : "h-[40px]";

  return (
    <div className="w-full min-h-[72px] p-4 bg-white">
      <form onSubmit={handleNewsComment} className="w-full flex flex-col gap-2">
        {selectedImage && (
          <div className="relative w-20 h-20">
            <img
              src={selectedImage}
              alt="미리보기"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-[-10px] right-[-5px] bg-black opacity-80 text-white text-xs px-1 rounded-full"
            >
              X
            </button>
          </div>
        )}

        <div className="w-full flex gap-4 place-items-end justify-between">
          <button
            type="button"
            onClick={handleFileSelect}
            className="w-10 h-10 flex items-center justify-center rounded-[5px] border border-gray2 py-2.5 gap-2.5 bg-gray1"
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
          <div className="w-full max-w-[576px] flex justify-center items-center">
            <textarea
              maxLength={78}
              rows={2}
              value={inputValue}
              onChange={handleTextChange}
              placeholder="상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"
              className={`w-full ${textareaHeight} rounded-[5px] border border-gray7 px-3 py-2 overflow-hidden resize-none placeholder:text-start placeholder:items-center placeholder:justify-center`}
            />
          </div>
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-[5px] border border-gray2 py-4 gap-2.5 bg-gray1"
          >
            {inputValue || selectedImage ? (
              <Send_icon fill="#00ADEE" />
            ) : (
              <Send_icon />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsSendCommentBox;
