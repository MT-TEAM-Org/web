"use client";

import React, { useState } from "react";
import Tiptap from "./Tiptap";
import { useRouter } from "next/navigation";
import axios from "axios";

const NotePicker = () => {
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  // const handleAdmit = async () => {
  //   if (content.trim()) {
  //     try {
  //       const response = await axios.post(""});

  //       if (response.status === 200) {
  //         alert("등록되었습니다!");

  //         router.push("/");
  //       }
  //     } catch (error) {
  //       console.error("Error posting content:", error);
  //       alert("등록에 실패했습니다.");
  //     }
  //   } else {
  //     alert("내용을 입력해주세요.");
  //   }
  // };

  const handleCancel = () => {
    router.push("/목록페이지");
  };

  return (
    <div className="max-w-5xl w-full mx-auto mb-10">
      <Tiptap content={content} onChange={handleContentChange} />
      <div className="w-full border mt-4 rounded-md p-4">
        <p className="text-sm mb-4">
          불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라
          삭제·접속차단 등의 조치가 취해질 수 있음 관련 법률에 따라 처벌받을 수
          있습니다.
        </p>
        <ol className="list-disc pl-6 space-y-2 text-sm">
          <li>
            허용 확장자(jpg, jpeg, png, webp, heic, mp4, mov, webm, gif) 총
            10개까지 파일당 40MB까지 업로드 가능합니다.
          </li>
          <li>
            40MB보다 더 큰 용량의 영상물은 유튜브 링크 첨부 시 재생이
            가능합니다.
          </li>
          <li>11MB~40MB 움짤은 11MB 이하로 자동변환됩니다.</li>
          <li>음원 있는 움짤/동영상은 30초 이내 길이만 가능합니다.</li>
        </ol>
      </div>

      <div className="flex justify-between mt-4 space-x-4 ">
        <button
          type="button"
          onClick={handleCancel}
          className="px-11 py-3 border-2 text-black rounded-md"
        >
          목록
        </button>
        <button
          type="button"
          // onClick={handleAdmit}
          className={"px-11 py-3 rounded bg-emerald-500 text-white"}
        >
          작성완료
        </button>
      </div>
    </div>
  );
};

export default NotePicker;
