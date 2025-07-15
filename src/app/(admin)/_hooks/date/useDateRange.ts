import { useToast } from "@/_hooks/useToast";
import { useRef, useState } from "react";
import { validateDate } from "../../_utils/validateDate";

interface DateRange {
  start: string;
  end: string;
}

interface DateRefs {
  start: React.RefObject<HTMLInputElement>;
  end: React.RefObject<HTMLInputElement>;
}

export const useDateRange = () => {
  const { error } = useToast();
  const dateRefs: DateRefs = {
    start: useRef<HTMLInputElement>(null),
    end: useRef<HTMLInputElement>(null),
  };
  
  const [selectedDates, setSelectedDates] = useState<DateRange>({
    start: "",
    end: "",
  });

  const handleDateChange = (
    type: "start" | "end",
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    
    const validation = validateDate(type, value, selectedDates.start, selectedDates.end);
    
    if (!validation.isValid) {
      error(validation.errorMessage!, "");
      setSelectedDates(prev => ({ ...prev, [type]: "" }));
      return;
    }

    setSelectedDates(prev => ({ ...prev, [type]: value }));
  };

  return {
    dateStartInputRef: dateRefs.start,
    dateEndInputRef: dateRefs.end,
    selectedStartDate: selectedDates.start,
    selectedEndDate: selectedDates.end,
    handleDateChange,
  };
};