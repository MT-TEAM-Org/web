export const onHandleToTop = (commentBarRef: React.RefObject<HTMLDivElement>) => {
  if (commentBarRef.current) {
    const navBarHeight = 130;
    const y =
      commentBarRef.current.getBoundingClientRect().top +
      window.scrollY -
      navBarHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};