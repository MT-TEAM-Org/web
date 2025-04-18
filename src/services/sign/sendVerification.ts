import axios from "axios";
import generateVerificationEmail from "./emailTemplate/emailTemlate";

const sendVerification = async (email: string) => {
  const htmlTemplate = generateVerificationEmail(email); // {code} 비워진 상태
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/certification/send`,
    {
      email,
      html: htmlTemplate, // {code}가 그대로 있는 HTML을 보냄
    }
  );
  return response.data;
};

export default sendVerification; // import axios from "axios";

// const sendVerification = async (email: string) => {
//   const response = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_URL}api/certification/send`,
//     {
//       email,
//     }
//   );
//   return response.data;
// };

// export default sendVerification;
