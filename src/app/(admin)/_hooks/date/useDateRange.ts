import { useToast } from "@/_hooks/useToast";
import { useState } from "react";
import { validateDate } from "../../_utils/validateDate";

interface DateRange {
  start: string;
  end: string;
}

export const useDateRange = () => {
  const { warning } = useToast();

  const [selectedDates, setSelectedDates] = useState<DateRange>({
    start: "",
    end: "",
  });

  const handleDateChange = (
    type: "start" | "end",
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;

    const validation = validateDate(
      type,
      value,
      selectedDates.start,
      selectedDates.end
    );

    if (!validation.isValid) {
      warning(validation.errorMessage!, "");
      setSelectedDates((prev) => ({ ...prev, [type]: "" }));
      return;
    }

    setSelectedDates((prev) => ({ ...prev, [type]: value }));
  };

  return {
    selectedStartDate: selectedDates.start,
    selectedEndDate: selectedDates.end,
    handleDateChange,
  };
};
