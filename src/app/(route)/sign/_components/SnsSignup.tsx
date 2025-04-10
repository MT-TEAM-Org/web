import Input from "@/app/_components/Input";
import { snsSignupInputObject } from "../constants/signup";
import { UseFormRegister } from "react-hook-form";

interface SnsSignupProps {
  register: UseFormRegister<any>;
  errors: any;
  isError: boolean;
}

const SnsSignup = ({ register, errors, isError }: SnsSignupProps) => {
  return (
    <div className="space-y-[24px]">
      <Input
        height={48}
        id="email"
        register={register}
        label="이메일 아이디"
        isDisabled
      />
      {snsSignupInputObject.map((input) => (
        <div className="space-y-[4px] relative" key={input.id}>
          <Input
            {...register(input.id, input.validation || {})}
            type={input.type}
            id={input.id}
            placeholder={input.placeholder}
            height={48}
            register={register}
            label={input.label}
            isDisabled={input.disabled}
            required
            autoFocus={input.autoFocus}
          />
          <p
            className={`text-[14px] mx-[16px] ${
              errors[input.id] || isError ? "text-[#D1504B]" : "text-gray5"
            }`}
          >
            {errors[input.id]?.message || input.defultMessage}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SnsSignup;
