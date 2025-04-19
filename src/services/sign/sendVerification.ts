import axios from "axios";
import generateVerificationEmail from "./emailTemplate/emailTemplate";

const sendVerification = async (email: string) => {
  const htmlTemplate = generateVerificationEmail(email);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/certification/send`,
    {
      email,
      html: htmlTemplate,
    }
  );
  return response.data;
};

export default sendVerification;
