"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import usePostNotice from "@/_hooks/fetcher/customer/usePostNotice";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import { CustomerFormData } from "../../_types/customerFormType";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/_hooks/useToast";
import { useEditStore } from "@/utils/Store";

const NoticeWrite = () => {
  const { isEditMode, boardData, resetEditState } = useEditStore();
  const router = useRouter();
  const { mutate: postNotice } = usePostNotice();
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  const { register, watch, setValue, handleSubmit } = useForm<CustomerFormData>(
    {
      defaultValues: {
        boardType: "NOTICE",
        categoryType: "NOTICE",
        title: "",
        content: "",
        link: "",
        thumbnail: "",
      },
    }
  );

  const handleImageUpload = async (blob: Blob) => {
    try {
      const response = await getUpload({
        contentType: blob.type,
        fileName: `notice-image-${Date.now()}.${blob.type.split("/")[1]}`,
      });
      console.log("response: ", response);
      await axios.put(response.data.presignedUrl, blob, {
        headers: { "Content-Type": blob.type },
      });
      console.log("presignedUrl: ", response.data.presignedUrl);
      return response.data.downloadUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const link = watch("link");

  useEffect(() => {
    if (!editParam) {
      resetEditState();
    } else if (isEditMode && boardData) {
      setValue("categoryType", boardData.categoryType);
      setValue("title", boardData.title);
      setValue("content", boardData.content);
      if (boardData.link) setValue("link", boardData.link);
      if (boardData.thumbnail) setValue("thumbnail", boardData.thumbnail);
    }
    return () => {
      if (!editParam) {
        resetEditState();
      }
    };
  }, [editParam, isEditMode, boardData, setValue, resetEditState]);

  const getYoutubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^?&]+)/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
      : "";
  };

  useEffect(() => {
    if (link) {
      const thumbnail = getYoutubeThumbnail(link);
      if (thumbnail) {
        setValue("thumbnail", thumbnail);
      }
    }
  }, [link]);

  const onSubmit = (data: CustomerFormData) => {
    const thumbnail =
      data.thumbnail || (data.link ? getYoutubeThumbnail(data.link) : "");

    const currentCategory = watch("categoryType");

    const noticeData = {
      title: data.title,
      content: data.content,
      link: data.link || "",
      thumbnail: data.thumbnail || "",
      boardType: data.boardType,
      categoryType: data.categoryType,
    };

    postNotice(noticeData, {
      onSuccess: () => {
        router.replace("/customer");
      },
    });
  };

  return (
    <div className="w-[720px] min-h-[648px] h-auto flex flex-col items-center bg-white shadow-md rounded-[5px] p-6">
      <form
        className="w-full flex flex-col gap-1 items-start justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-[18px] leading-7 tracking-[-0.72px] text-gray8">
          공지사항 작성
        </h2>
        <div className="w-full">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="제목을 입력해주세요."
            className="w-full h-[40px] rounded-[5px] border border-gray3 px-4 py-2 placeholder:text-gray5"
          />
        </div>
        <div className="flex items-center w-full">
          <Tiptap
            onChange={(content) => setValue("content", content)}
            register={register}
            watch={watch}
            setValue={setValue}
            initialContent=""
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default NoticeWrite;
function resetEditState() {
  throw new Error("Function not implemented.");
}
