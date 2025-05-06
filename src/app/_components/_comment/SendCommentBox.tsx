"use client";

import Send_icon from "@/app/_components/icon/Send_icon";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import Plus from "@/app/_components/icon/Plus";
import Cancel_icon from "@/app/_components/icon/Cancel_icon";
import { useToast } from "@/_hooks/useToast";
import { RefetchOptions, useQueryClient } from "@tanstack/react-query";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { CommentItem, CommentType } from "@/_types/comment";
import usePostComment from "@/_hooks/fetcher/comment/usePostComment";
import { cn } from "@/utils";
import useIsMobile from "@/utils/useIsMobile";
import { useAuthStore } from "@/utils/Store";
import SignInModalPopUp from "../SignInModalPopUp";
import { QueryObserverResult } from "@tanstack/react-query";

interface SendCommentBoxProps {
  id?: string;
  parentsComment?: CommentItem;
  setParentsComment: (comment: CommentItem) => void;
  type: CommentType;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}

const SendCommentBox = ({
  id,
  parentsComment,
  setParentsComment,
  type,
  refetch,
}: SendCommentBoxProps) => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);
  const toast = useToast();
  const { mutate: postComment } = usePostComment(id);
  const { data: authCheckData } = useAuthCheck();
  const mentionedPublicId = authCheckData?.data?.data?.publicId;
  const isMobile = useIsMobile();
  const { isLoggedIn } = useAuthStore();
  const [guestModal, setGuestModal] = useState(false);

  const maxChars = 120;

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  useEffect(() => {
    if (parentsComment) {
      textRef.current?.focus();
    }
  }, [parentsComment]);

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
    if (!isLoggedIn) {
      setGuestModal(true);
      return;
    }
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
      toast.error("이미지 업로드에 실패했습니다.", "");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePostComment = async (
    e: React.FormEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setGuestModal(true);
      return;
    }
    if (!inputValue.trim() && !selectedImage) return;
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    postComment(
      {
        type,
        comment: inputValue,
        imageUrl: selectedImage || null,
        mentionedPublicId,
        parentId: parentsComment?.commentId || null,
      },
      {
        onSuccess: () => {
          if (refetch) refetch();
          if (parentsComment) setParentsComment(null);
          if (type === "INQUIRY") {
            queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
          } else if (type === "BOARD") {
            queryClient.invalidateQueries({ queryKey: ["board", "list"] });
          }
          queryClient.invalidateQueries({
            queryKey: ["commentList", type, id],
          });
          queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
          queryClient.invalidateQueries({
            queryKey: ["bestComment", { id, type }],
          });
          setInputValue("");
          setSelectedImage(null);
          if (textRef.current) textRef.current.innerText = "";
          isSubmittingRef.current = false;
        },
        onError: () => {
          isSubmittingRef.current = false;
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && inputValue.length === 0) {
      setParentsComment(null);
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostComment(e);
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

  const buttonStyles =
    "w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center rounded-[5px] border border-gray2 bg-gray1";

  return (
    <div
      className={cn(
        "w-full p-4 bg-white",
        "mobile:px-[8px] mobile:pt-[8px] mobile:pb-[16px]"
      )}
    >
      <form onSubmit={handlePostComment} className="w-full flex flex-col gap-2">
        <div
          className={cn(
            "w-full flex items-end gap-4",
            "mobile:gap-2 mobile:justify-center"
          )}
        >
          <button
            type="button"
            onClick={handleFileSelect}
            className={buttonStyles}
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
          <div
            ref={containerRef}
            className={cn(
              "flex-grow max-w-[576px] relative w-full",
              "tablet:max-w-[544px]",
              "mobile:max-w-[615px]"
            )}
          >
            <div
              className="rounded-[5px] border border-gray7 px-3 py-2 flex items-start gap-[8px] text-[14px] leading-[22px] w-full min-h-[44px]"
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
                    className="w-[16px] h-[16px] absolute top-[-6px] right-[-6px] bg-black opacity-70 text-white text-xs flex items-center justify-center rounded-full"
                  >
                    <Cancel_icon />
                  </button>
                </div>
              )}
              {parentsComment && (
                <p className="leading-[20px] text-gra text-nowrap flex-shrink-0">
                  @{parentsComment?.nickname}
                </p>
              )}
              <div
                ref={textRef}
                contentEditable
                onInput={handleContentChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="flex-grow outline-none min-w-0 overflow-y-hidden w-full"
              />
              {!inputValue.trim() && !selectedImage && !parentsComment && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">
                    {isMobile
                      ? "메세지를 입력해주세요."
                      : "상대를 존중하는 클린한 댓글을 남겨주세요! 추천은 센스!"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() && !selectedImage}
            className={buttonStyles}
          >
            <Send_icon
              fill={inputValue.trim() || selectedImage ? "#00ADEE" : "#C0C0C0"}
            />
          </button>
        </div>
      </form>
      <SignInModalPopUp
        isOpen={guestModal}
        onClose={() => setGuestModal(false)}
      />
    </div>
  );
};

export default SendCommentBox;
