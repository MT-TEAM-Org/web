import { SignupFormData } from "../types/signup";
import { RegisterOptions } from "react-hook-form";

type InputField = {
  label: string;
  type: string;
  id: keyof SignupFormData;
  placeholder: string;
  defultMessage?: string;
  validation?: RegisterOptions<SignupFormData>;
};

export const signupInputObject: InputField[] = [
  {
    label: "비밀번호",
    type: "password",
    id: "password",
    placeholder: "비밀번호를 입력해주세요.",
    defultMessage: "영문+숫자 조합 4자~10자 이내",
    validation: {
      required: "비밀번호를 입력해주세요.",
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/,
        message: "영문+숫자 조합 4자~10자 이내",
      },
    },
  },
  {
    label: "핸드폰 번호",
    type: "number",
    id: "tel",
    placeholder: "핸드폰 번호를 입력해주세요.",
    defultMessage: "10자~11자 이내",
    validation: {
      required: "핸드폰 번호를 입력해주세요.",
      pattern: {
        value: /^\d{10,11}$/,
        message: "10자~11자 이내",
      },
    },
  },
  {
    label: "닉네임",
    type: "text",
    id: "nickname",
    placeholder: "닉네임을 입력해주세요.",
    defultMessage: "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)",
    validation: {
      required: "닉네임을 입력해주세요.",
      maxLength: {
        value: 10,
        message: "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)",
      },
    },
  },
];
