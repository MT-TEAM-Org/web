import axios from "axios";

interface SnsAddInfoData {
  email: string;
  memberType: "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE" | "DISCORD";
  tel: string;
  nickname: string;
}

const snsAddInfo = async (data: SnsAddInfoData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/oauth/add-info`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default snsAddInfo;
