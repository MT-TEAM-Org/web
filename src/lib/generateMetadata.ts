import { Metadata } from "next";

type Options = {
  title: string | null;
  content?: string | null;
  thumbUrl?: string | null;
  fallbackTitle: string;
  fallbackDescription: string;
  keywords?: string[];
  stripHtmlContent?: boolean;
};

const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

export function createMetadata({
  title,
  content,
  thumbUrl,
  fallbackTitle,
  fallbackDescription,
  stripHtmlContent,
  keywords = ["플레이하이브"],
}: Options): Metadata {
  const rawContent = content || fallbackDescription;
  const plainTextContent = (stripHtmlContent ?? true)
    ? stripHtml(rawContent).trim()
    : rawContent.trim();
  const hasContent = plainTextContent.length > 0;

  return {
    title: title || fallbackTitle,
    description: hasContent ? plainTextContent : fallbackDescription,
    openGraph: {
      title: title || fallbackTitle,
      description: hasContent ? plainTextContent : fallbackDescription,
      images: !thumbUrl
        ? [
            {
              url: "https://playhive.co.kr/Metadata.png",
              alt: "PlayHive 미리보기 이미지",
              width: 1200,
              height: 630,
            },
          ]
        : [{ url: thumbUrl, width: 1200, height: 630 }],
    },
    keywords,
  };
}