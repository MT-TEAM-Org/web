"use client";

import postReport from "@/services/board/postReport";
import { useMutation } from "@tanstack/react-query";
import { ReportData } from "@/services/board/types/report";
import { useToast } from "@/_hooks/useToast";

const usePostReport = () => {
  const { success, error: errorToast } = useToast();

  return useMutation({
    mutationFn: (data: ReportData) => postReport(data),
    onSuccess: () => {
      success("신고가 완료되었습니다.", "");
    },
    onError: (error: any) => {
      if (error.response?.status === 429) {
        errorToast(error.response.data.message, "");
        return;
      }
      errorToast("신고에 실패했습니다. 다시 시도해주세요.", "");
    },
  });
};

export default usePostReport;
