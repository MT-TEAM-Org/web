interface ChangedCategoryProps {
  category?: string;
}

const ChangedCategory = ({ category }: ChangedCategoryProps): string => {
  const getCategoryName = (category?: string): string => {
    switch (category) {
      case "BASEBALL":
        return "야구";
      case "FOOTBALL":
        return "축구";
      case "ESPORTS":
        return "e스포츠";
      default:
        return "기타";
    }
  };

  return getCategoryName(category);
};

export default ChangedCategory;