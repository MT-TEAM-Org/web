export const highlightText = (
  text: string,
  searchType: string,
  searchString: string
) => {
  const type = searchType || "TITLE_CONTENT";

  if (!searchString || searchString.trim() === "") return text;

  if (
    type === "CONTENT" ||
    type === "COMMENT" ||
    type === "TITLE_CONTENT" ||
    type === "TITLE"
  ) {
    const parts = text?.split(new RegExp(`(${searchString})`, "gi"));
    return (
      <>
        {parts?.map((part, index) =>
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
