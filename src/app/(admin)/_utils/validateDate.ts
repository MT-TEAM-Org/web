interface DateValidation {
  isValid: boolean;
  errorMessage?: string;
}

export const validateDate = (
  type: "start" | "end",
  value: string,
  startDate: string,
  endDate: string
): DateValidation => {
  const today = new Date().toISOString().split("T")[0];

  if (value > today) {
    return {
      isValid: false,
      errorMessage: "시작날짜가 오늘보다 미래로 지정 할 수 없습니다.",
    };
  }

  if (type === "start" && endDate && value > endDate) {
    return {
      isValid: false,
      errorMessage: "시작날짜가 종료날짜보다 빠를 수 없습니다.",
    };
  }

  if (type === "end" && startDate && value < startDate) {
    return {
      isValid: false,
      errorMessage: "종료날짜가 시작날짜보다 빠를 수 없습니다.",
    };
  }

  return { isValid: true };
};
