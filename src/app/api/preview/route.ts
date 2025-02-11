import { NextResponse } from "next/server";
import { getLinkPreview } from "link-preview-js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL이 필요합니다." }, { status: 400 });
  }

  try {
    const preview = await getLinkPreview(url);
    return NextResponse.json(preview);
  } catch (error) {
    return NextResponse.json(
      { error: "미리보기를 가져올 수 없습니다." },
      { status: 500 }
    );
  }
}
