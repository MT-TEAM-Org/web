import Link from "next/link";

interface SignupValue {
  email: string;
  password: string;
  tel: string;
  nickname: string;
  gender: string;
}

interface SignupProps {
  setSignupValue: React.Dispatch<React.SetStateAction<SignupValue>>;
}

const Signup = ({ setSignupValue }: SignupProps) => {
  const inputObject = [
    {
      label: "비밀번호",
      type: "password",
      id: "password",
      placeholder: "비밀번호를 입력해주세요.",
      validation: "영문+숫자 조합 4자~10자 이내",
    },
    {
      label: "이름",
      type: "text",
      id: "name",
      placeholder: "이름",
      validation: "이름을 입력해주세요.",
    },
    {
      label: "핸드폰 번호",
      type: "number",
      id: "tel",
      placeholder: "핸드폰 번호를 입력해주세요.",
      validation: "10자~11자 이내",
    },
    {
      label: "닉네임",
      type: "text",
      id: "nickname",
      placeholder: "닉네임을 입력해주세요.",
      validation: "한글+영문 / 한글 + 숫자 등 모두 가능 (10자 이내로)",
    },
    {
      label: "생년월일",
      type: "date",
      id: "birthdate",
      placeholder: "생년월일을 입력해주세요.",
      validation: "YYYY-MM-DD 형식으로 입력해주세요.",
    },
    {
      label: "성별",
      type: "text",
      id: "gender",
      placeholder: "성별",
      validation: "성별을 입력해주세요.",
    },
  ];

  const inputStyle = "w-full border py-4 px-5 rounded-md font-medium";
  const signupValidationStyle = "text-sm text-gray-400 ml-5";

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="id" className="text-sm font-semibold">
          이메일 아이디
        </label>
        <div className="flex gap-1">
          <input
            onChange={(e) =>
              setSignupValue((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            className={inputStyle}
            id="email"
            placeholder="아이디를 입력해주세요."
          />
          <button
            className="w-[100px] bg-gray-700 hover:bg-gray-800 p-1 text-white rounded-md font-semibold"
            type="button"
          >
            확인
          </button>
        </div>
      </div>
      {inputObject.map((input) => (
        <div className="space-y-2" key={input.id}>
          <label htmlFor={input.id} className="text-sm font-semibold">
            {input.label}
          </label>
          <input
            type={input.type}
            className={inputStyle}
            id={input.id}
            placeholder={input.placeholder}
            onChange={(e) =>
              setSignupValue((prev) => ({
                ...prev,
                [input.id]: e.target.value,
              }))
            }
          />
          <p className={signupValidationStyle}>{input.validation}</p>
        </div>
      ))}
      <button className="w-full bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md font-semibold">
        회원가입 완료
      </button>

      <div className="flex justify-center mt-5">
        <p className="text-sm text-gray-400 font-semibold">SNS 간편 회원가입</p>
      </div>
      <div className="w-[400px] mx-auto flex gap-2 justify-around mt-5">
        <button className="text-red-500">구글</button>
        <button className="text-green-500">네이버</button>
        <button className="text-yellow-500">카카오</button>
        <button className="text-blue-500">디스코드</button>
      </div>
      <div className="flex justify-around text-gray-500 text-sm font-semibold mt-5">
        <Link href="/" className="underline hover:text-gray-600">
          1:1 문의하기
        </Link>
      </div>
    </div>
  );
};

export default Signup;
