"use client";
import { use } from "react";

interface NewsParams {
  NewsType: string;
}

const News = ({ params }: { params: Promise<NewsParams> }) => {
  const unwrappedParams = use(params);
  const { NewsType } = unwrappedParams;

  return null;
};

export default News;
