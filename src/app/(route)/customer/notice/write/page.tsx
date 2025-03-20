"use client";

import React from "react";
import { useForm } from "react-hook-form";
import usePostNotice from "@/_hooks/fetcher/customer/usePostNotice";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import { CustomerFormData } from "../../_types/customerFormType";

const NoticeWrite = () => {
  const { mutate: postNotice } = usePostNotice();

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
      await axios.put(response.data.presignedUrl, blob, {
        headers: { "Content-Type": blob.type },
      });
      return response.data.downloadUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const onSubmit = (data: CustomerFormData) => {
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
        console.log("공지사항 등록 성공");
      },
      onError: (error) => {
        console.error("공지사항 등록 실패:", error);
      },
    });
  };

  return (
    <div className="w-[720px] min-h-[648px] h-auto flex flex-col items-center bg-white shadow-sm rounded-[5px] p-6">
      <form
        className="w-full flex flex-col gap-4"
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
        <Tiptap
          onChange={(content) => setValue("content", content)}
          register={register}
          watch={watch}
          setValue={setValue}
          initialContent=""
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default NoticeWrite;
