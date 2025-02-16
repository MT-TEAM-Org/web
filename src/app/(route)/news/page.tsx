"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsPage = () => {
  const [news, setNews] = useState(null);

  const getNews = async () => {
    try {
      const queryString = "page=1&size=10&category=ESPORTS&orderType=DATE";
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/news?${queryString}`
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <div>
      <h1 onClick={getNews}>News Test</h1>
    </div>
  );
};

export default NewsPage;
