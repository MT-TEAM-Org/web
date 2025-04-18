"use client";

import { useEffect, useState } from "react";

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 769 && window.innerWidth <= 1279);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet;
};

export default useIsTablet;
