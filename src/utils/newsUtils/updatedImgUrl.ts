export const updateImageUrl = (thumbImg, imgType) => {
  return thumbImg?.replace("type=w140", `type=${imgType}`);
};