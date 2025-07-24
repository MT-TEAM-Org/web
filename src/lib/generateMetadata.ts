import { Metadata } from "next";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

type Options = {
  title: string | null;
  content?: string | null;
  thumbUrl?: string | null;
  fallbackTitle: string;
  fallbackDescription: string;
  keywords?: string[];
  stripHtmlContent?: boolean;
};

const window = new JSDOM("").window;
const dompurify = createDOMPurify(window);

const stripHtml = (html: string) => dompurify.sanitize(html, { ALLOWED_TAGS: [] });

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