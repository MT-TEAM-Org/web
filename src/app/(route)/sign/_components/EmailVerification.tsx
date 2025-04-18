"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/_hooks/useToast";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { SignupFormData } from "../types/signup";
import useSendVerification from "@/_hooks/fetcher/sign/useSendVerification";
import useCheckVerification from "@/_hooks/fetcher/sign/useCheckVerification";

interface EmailVerificationProps {
  register: UseFormRegister<SignupFormData>;
  isPending: boolean;
  errors: FieldErrors<SignupFormData>;
  getValues: (name: string) => string;
  setSuccessVerification: (value: boolean) => void;
}

const EmailVerification = ({
  register,
  isPending,
  getValues,
  errors,
  setSuccessVerification,
}: EmailVerificationProps) => {
  const { error } = useToast();
  const { mutate: sendVerification, isSuccess: sendVerificationIsSuccess } =
    useSendVerification();
  const {
    mutate: checkVerification,
    isSuccess: checkVerificationIsSuccess,
    isError: checkVerificationIsError,
  } = useCheckVerification();
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      if (timeLeft === 0) {
        setIsExpired(true);
        setVerificationCode(""); // 인증 코드 초기화
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleTimerOn = () => {
    setTimeLeft(300);
    setIsExpired(false);
  };

  const handleSendVerification = () => {
    setIsExpired(false);
    const email = getValues("email");
    if (!email) {
      error("이메일을 입력해주세요.", "");
      return;
    }
    sendVerification(email, {
      onSuccess: () => {
        handleTimerOn();
      },
    });
  };

  const handleCheckVerification = () => {
    const email = getValues("email");
    if (!email) {
      return;
    }
    if (!verificationCode) {
      error("인증코드를 입력해주세요.", "");
      return;
    }
    checkVerification(
      { email, code: verificationCode },
      {
        onSuccess: () => {
          setSuccessVerification(true);
        },
      }
    );
  };

  const inputStyle =
    "h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
  const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
  const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
  const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
  const verificationButton =
    "w-[80px] bg-[#424242] text-[#FFFFFF] text-[16px] rounded-[5px] font-[700]";
  const disabledVerificationButton =
    "w-[80px] bg-[#FAFAFA] text-[#424242] text-[16px] rounded-[5px] font-[700]";
  return (
    <div className="space-y-[8px]">
      <div className="space-y-[2px]">
        <label
          htmlFor="email"
          className="text-[14px] leading-[22px] text-[#424242]"
        >
          이메일 인증<span className="text-[#D1504B]">*</span>
        </label>
        <div className="flex justify-between gap-[8px]">
          <input
            {...register("email", { required: true })}
            type="text"
            autoFocus
            className={`${
              isPending ? isDisabledInputStyle : inputStyle
            } w-[240px]`}
            id="email"
            disabled={isPending || checkVerificationIsSuccess}
            placeholder="이메일 아이디를 입력해주세요."
          />
          {sendVerificationIsSuccess ? (
            <button
              className={disabledVerificationButton}
              type="button"
              onClick={handleSendVerification}
              disabled={checkVerificationIsSuccess}
            >
              재전송
            </button>
          ) : (
            <button
              className={verificationButton}
              type="button"
              onClick={handleSendVerification}
            >
              인증 전송
            </button>
          )}
        </div>
        {errors.email && (
          <p className="text-[14px] text-[#D1504B] ml-[16px]">
            이메일 인증을 진행해주세요.
          </p>
        )}
      </div>
      <div className="space-y-[4px]">
        {sendVerificationIsSuccess && (
          <div className="flex justify-between gap-[8px]">
            <input
              type="text"
              className={`${
                isPending ? isDisabledInputStyle : inputStyle
              } w-[240px]`}
              id="code"
              disabled={isPending || checkVerificationIsSuccess}
              placeholder="인증코드를 입력해주세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {checkVerificationIsSuccess ? (
              <button
                className={disabledVerificationButton}
                disabled={true}
                type="button"
              >
                인증완료
              </button>
            ) : (
              <button
                onClick={handleCheckVerification}
                className={verificationButton}
                type="button"
              >
                인증
              </button>
            )}
          </div>
        )}
        {checkVerificationIsError ? (
          <p className="text-[14px] text-[#D1504B] ml-[16px]">
            이메일 인증코드를 확인해주세요.
          </p>
        ) : isExpired ? (
          <p className="text-[14px] text-[#D1504B] ml-[16px]">
            인증 시간이 만료되었습니다. 다시 인증해주세요.
          </p>
        ) : sendVerificationIsSuccess &&
          !checkVerificationIsSuccess &&
          !isExpired ? (
          <p className={isPending ? isDisabledHelpTextStyle : helpTextStyle}>
            인증 시간 제한{" "}
            {timeLeft !== null &&
              `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(
                2,
                "0"
              )}`}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default EmailVerification;
// "use client";

// import { useEffect, useState } from "react";
// import { useToast } from "@/_hooks/useToast";
// import { UseFormRegister, FieldErrors } from "react-hook-form";
// import { SignupFormData } from "../types/signup";
// import useSendVerification from "@/_hooks/fetcher/sign/useSendVerification";
// import useCheckVerification from "@/_hooks/fetcher/sign/useCheckVerification";

// interface EmailVerificationProps {
//   register: UseFormRegister<SignupFormData>;
//   isPending: boolean;
//   errors: FieldErrors<SignupFormData>;
//   getValues: (name: string) => string;
//   setSuccessVerification: (value: boolean) => void;
// }

// const EmailVerification = ({
//   register,
//   isPending,
//   getValues,
//   errors,
//   setSuccessVerification,
// }: EmailVerificationProps) => {
//   const { error } = useToast();
//   const { mutate: sendVerification, isSuccess: sendVerificationIsSuccess } =
//     useSendVerification();
//   const {
//     mutate: checkVerification,
//     isSuccess: checkVerificationIsSuccess,
//     isError: checkVerificationIsError,
//   } = useCheckVerification();
//   const [verificationCode, setVerificationCode] = useState("");
//   const [timeLeft, setTimeLeft] = useState<number | null>(null);
//   const [isExpired, setIsExpired] = useState(false);

//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0) {
//       if (timeLeft === 0) {
//         setIsExpired(true);
//         setVerificationCode(""); // 인증 코드 초기화
//       }
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleTimerOn = () => {
//     setTimeLeft(300);
//     setIsExpired(false);
//   };

//   const handleSendVerification = () => {
//     setIsExpired(false);
//     const email = getValues("email");
//     if (!email) {
//       error("이메일을 입력해주세요.", "");
//       return;
//     }
//     sendVerification(email, {
//       onSuccess: () => {
//         handleTimerOn();
//       },
//     });
//   };

//   const handleCheckVerification = () => {
//     const email = getValues("email");
//     if (!email) {
//       return;
//     }
//     if (!verificationCode) {
//       error("인증코드를 입력해주세요.", "");
//       return;
//     }
//     checkVerification(
//       { email, code: verificationCode },
//       {
//         onSuccess: () => {
//           setSuccessVerification(true);
//         },
//       }
//     );
//   };

//   const inputStyle =
//     "h-[48px] border-[1px] py-[16px] px-[12px] rounded-[5px] text-[#181818] leading-[22px] font-[500] text-[14px] placeholder-[#A6A6A6]";
//   const isDisabledInputStyle = inputStyle + " bg-[#EEEEEE] border-[#DBDBDB]";
//   const helpTextStyle = "text-[14px] text-[#A6A6A6] leading-[22px] px-[16px]";
//   const isDisabledHelpTextStyle = helpTextStyle + " text-[#A6A6A6]";
//   const verificationButton =
//     "w-[80px] bg-[#424242] text-[#FFFFFF] text-[16px] rounded-[5px] font-[700]";
//   const disabledVerificationButton =
//     "w-[80px] bg-[#FAFAFA] text-[#424242] text-[16px] rounded-[5px] font-[700]";
//   return (
//     <div className="space-y-[8px]">
//       <div className="space-y-[2px]">
//         <label
//           htmlFor="email"
//           className="text-[14px] leading-[22px] text-[#424242]"
//         >
//           이메일 인증<span className="text-[#D1504B]">*</span>
//         </label>
//         <div className="flex justify-between gap-[8px]">
//           <input
//             {...register("email", { required: true })}
//             type="text"
//             autoFocus
//             className={`${
//               isPending ? isDisabledInputStyle : inputStyle
//             } w-[240px]`}
//             id="email"
//             disabled={isPending || checkVerificationIsSuccess}
//             placeholder="이메일 아이디를 입력해주세요."
//           />
//           {sendVerificationIsSuccess ? (
//             <button
//               className={disabledVerificationButton}
//               type="button"
//               onClick={handleSendVerification}
//               disabled={checkVerificationIsSuccess}
//             >
//               재전송
//             </button>
//           ) : (
//             <button
//               className={verificationButton}
//               type="button"
//               onClick={handleSendVerification}
//             >
//               인증 전송
//             </button>
//           )}
//         </div>
//         {errors.email && (
//           <p className="text-[14px] text-[#D1504B] ml-[16px]">
//             이메일 인증을 진행해주세요.
//           </p>
//         )}
//       </div>
//       <div className="space-y-[4px]">
//         {sendVerificationIsSuccess && (
//           <div className="flex justify-between gap-[8px]">
//             <input
//               type="text"
//               className={`${
//                 isPending ? isDisabledInputStyle : inputStyle
//               } w-[240px]`}
//               id="code"
//               disabled={isPending || checkVerificationIsSuccess}
//               placeholder="인증코드를 입력해주세요."
//               value={verificationCode}
//               onChange={(e) => setVerificationCode(e.target.value)}
//             />
//             {checkVerificationIsSuccess ? (
//               <button
//                 className={disabledVerificationButton}
//                 disabled={true}
//                 type="button"
//               >
//                 인증완료
//               </button>
//             ) : (
//               <button
//                 onClick={handleCheckVerification}
//                 className={verificationButton}
//                 type="button"
//               >
//                 인증
//               </button>
//             )}
//           </div>
//         )}
//         {checkVerificationIsError ? (
//           <p className="text-[14px] text-[#D1504B] ml-[16px]">
//             이메일 인증코드를 확인해주세요.
//           </p>
//         ) : isExpired ? (
//           <p className="text-[14px] text-[#D1504B] ml-[16px]">
//             인증 시간이 만료되었습니다. 다시 인증해주세요.
//           </p>
//         ) : sendVerificationIsSuccess &&
//           !checkVerificationIsSuccess &&
//           !isExpired ? (
//           <p className={isPending ? isDisabledHelpTextStyle : helpTextStyle}>
//             인증 시간 제한{" "}
//             {timeLeft !== null &&
//               `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(
//                 2,
//                 "0"
//               )}`}
//           </p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;
