import { jwtDecode, JwtPayload } from "jwt-decode";

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return false;
  }
};

export const checkAuthStatus = () => {
  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    console.log("토큰 유효: 로그인 상태 유지");
  } else {
    console.log("토큰 만료: 다시 로그인 필요");
    localStorage.removeItem("token");
  }
};
