export const highlightText = (
  text: string,
  searchType: string,
  searchString: string
) => {
  if (!searchString || searchString.trim() === "") return text;

  if (
    searchType === "CONTENT" ||
    searchType === "COMMENT" ||
    searchType === "TITLE_CONTENT" ||
    searchType === "TITLE"
  ) {
    const parts = text.split(new RegExp(`(${searchString})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchString.toLowerCase() ? (
            <span key={index} className="text-gra">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }

  return text;
};
