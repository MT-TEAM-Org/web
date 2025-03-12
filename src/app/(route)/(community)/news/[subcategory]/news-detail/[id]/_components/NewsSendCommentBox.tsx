import usePostComment from "@/_hooks/fetcher/news/comment/usePostComment";
import Send_icon from "@/app/_components/icon/Send_icon";
import { Plus, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";

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
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleNewsComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

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

  return (
    <div className="w-full min-h-[72px] p-4 bg-white">
      <form onSubmit={handleNewsComment} className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-4 items-center justify-between">
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
          <div className="relative w-full max-w-[576px]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"
              className="w-full h-10 rounded-[5px] border border-gray7 py-3 px-4 gap-4"
            />
            {selectedImage && (
              <div className="absolute -bottom-16 left-0 right-0">
                <div className="relative h-14 border rounded-md p-1 bg-gray-50">
                  <img
                    src={selectedImage}
                    alt="선택된 이미지"
                    className="h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-10 h-10 flex items-center justify-center rounded-[5px] border border-gray2 py-4 gap-2.5 bg-gray1"
          >
            <Send_icon />
          </button>
        </div>
        {selectedImage && <div className="h-16"></div>}
      </form>
    </div>
  );
};

export default NewsSendCommentBox;
