const isWithin24Hours = (isoTime: string): boolean => {
  const createdTime = new Date(isoTime).getTime();
  const now = Date.now();
  const hours24 = 24 * 60 * 60 * 1000; // 24시간을 밀리초로 환산
  return now - createdTime < hours24;
};

export default isWithin24Hours;
