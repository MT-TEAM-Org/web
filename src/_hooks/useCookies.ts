"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  (await cookies()).set(key, value, {
    httpOnly: true,
  });
}

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value;
}
