"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import usePostFeedback from "@/_hooks/fetcher/customer/usePostFeedback";
import usePostNotice from "@/_hooks/fetcher/customer/usePostNotice";
import { useEditStore } from "@/utils/Store";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import usePutPost from "@/_hooks/fetcher/board/usePutPost";
import CustomerTiptap from "../../../_components/ui/CustomerTiptap";
import { cn } from "@/utils";
import { useToast } from "@/_hooks/useToast";
import { useAdminRole } from "../../../_utils/adminChecker";
import SignInModalPopUp from "@/app/_components/SignInModalPopUp";

const Page = () => {
  return (
    <Suspense fallback={""}>
      <CustomerWrite />
    </Suspense>
  );
};

interface CustomerFormData {
  boardType: string;
  title: string;
  content: string;
  link: string;
  imgUrl: string;
}

const CustomerWrite = () => {
  const {
    isEditMode,
    boardId,
    boardData: customerData,
    resetEditState,
  } = useEditStore();
  const router = useRouter();
  const pathName = usePathname();
  const writeType = pathName.split("/")[2];
  const editPost = usePutPost();
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");
  const { error: errorToast } = useToast();
  const adminRole = useAdminRole();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isTitleOverLimit, setIsTitleOverLimit] = useState(false);

  useEffect(() => {
    const validTypes = ["notice", "feedback"];
    if (!validTypes.includes(writeType)) {
      router.push("/404");
    }
  }, [writeType, router]);

  const { mutate: postNotice } = usePostNotice();
  const { mutate: postFeedback } = usePostFeedback();

  const { register, handleSubmit, setValue, watch } = useForm<CustomerFormData>(
    {
      defaultValues: {
        boardType: writeType,
        content: "",
        title: "",
        link: "",
        imgUrl: "",
      },
    }
  );

  const [categoryType, setCategoryType] = React.useState(writeType);

  useEffect(() => {
    if (!editParam) {
      resetEditState();
    } else if (isEditMode && customerData) {
      setCategoryType(customerData.categoryType);
      setValue("title", customerData.title);
      setValue("content", customerData.content);
      if (customerData.link) setValue("link", customerData.link);
      if (customerData.thumbnail) setValue("imgUrl", customerData.thumbnail);
    }
    return () => {
      if (!editParam) {
        resetEditState();
      }
    };
  }, [editParam, isEditMode, customerData, setValue, resetEditState]);

  const handleImageUpload = async (blob: Blob) => {
    try {
      const response = await getUpload({
        contentType: blob.type,
        fileName: `image-${Date.now()}.${blob.type.split("/")[1]}`,
      });

      await axios.put(response.data.presignedUrl, blob, {
        headers: {
          "Content-Type": blob.type,
        },
      });

      const uploadedUrl = response.data.downloadUrl;
      setValue("imgUrl", uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const getYoutubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^?&]+)/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
      : "";
  };

  const onSubmit = async (data: CustomerFormData) => {
    if (!adminRole) {
      setIsSignInModalOpen(true);
      return;
    }

    const thumbnail =
      data.imgUrl || (data.link ? getYoutubeThumbnail(data.link) : "");
    const communityData = {
      boardType: writeType.toUpperCase(),
      categoryType: categoryType,
      title: data.title,
      content: data.content,
      link: data.link || "",
      imgUrl: thumbnail,
    };

    if (isEditMode) {
      editPost.mutate({ data: communityData, boardId });
    } else {
      if (writeType === "notice") {
        postNotice(communityData);
      } else if (writeType === "feedback") {
        postFeedback(communityData);
      }
    }
  };

  return (
    <div
      className={cn(
        "max-w-[720px] min-h-[648px] h-auto flex flex-col justify-center items-center bg-white shadow-sm rounded-[5px] px-3 pt-3 pb-6 gap-3",
        "tablet:border-none",
        "mobile:max-w-[768px] mobile:min-h-fit mobile:rounded-none"
      )}
    >
      <form
        className={cn("flex flex-col gap-3", "tablet:w-full", "mobile:w-full")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2
          className={cn(
            "w-[95px] min-h-[28px] flex gap-3 font-bold text-[18px] leading-7 tracking-[-0.72px] items-center text-gray8",
            "mobile:hidden"
          )}
        >
          {writeType === "notice" ? "공지사항 작성" : "개선요청 작성"}
        </h2>
        <div className="w-full h-[40px] flex items-center justify-center gap-5 border border-gray3 rounded-[5px]">
          <input
            {...register("title")}
            type="text"
            maxLength={30}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 30) {
                setIsTitleOverLimit(true);
                errorToast(
                  "입력 제한 초과",
                  "제목은 최대 30자까지 입력할 수 있습니다."
                );
              } else {
                setIsTitleOverLimit(false);
              }
            }}
            placeholder="제목을 입력해주세요."
            className="px-4 py-2 w-full h-full rounded-md placeholder:text-gray5"
          />
        </div>
        <CustomerTiptap
          onChange={(content) => {
            setValue("content", content);
          }}
          register={register}
          watch={watch}
          initialContent={
            isEditMode && customerData ? customerData.content : ""
          }
          onImageUpload={handleImageUpload}
          setValue={setValue}
          onSubmit={handleSubmit(onSubmit)}
          writeType={writeType}
          isTitleOverLimit={isTitleOverLimit}
        />
      </form>
      <SignInModalPopUp
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
};

export default Page;
