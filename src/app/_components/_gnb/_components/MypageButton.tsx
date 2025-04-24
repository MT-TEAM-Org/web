"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileLogo } from "../../icon/ProfileLogo";
import ConfirmModal from "../../ConfirmModal";
import useLogout from "@/_hooks/fetcher/mypage/useLogout";
import useAuthCheck from "@/_hooks/useAuthCheck";
import { useAuthStore } from "@/utils/Store";
import Image from "next/image";

interface DropDownMenuItem {
  name: string;
  link?: string;
}

export const MypageButton = ({ userNickname }: { userNickname: string }) => {
  const router = useRouter();
  const [isDropDown, setIsDropDown] = useState(false);
  const { data: authCheckData } = useAuthCheck();
  const userRole = authCheckData?.data?.data?.role;
  const [show, setShow] = useState(false);
  const { mutate: logout, isPending: logoutIsPending } = useLogout();
  const { logout: changeLogout } = useAuthStore();
  const userImg = authCheckData?.data?.data?.imgUrl;

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [show]);

  const dropDownMenu = [
    {
      name: "마이페이지",
      link: "/mypage",
    },
    {
      name: "내가 쓴 게시물",
      link: "/mypage/posts",
    },
    {
      name: "내가 쓴 댓글",
      link: "/mypage/comments",
    },
    {
      name: "내 정보 수정",
      link: "/mypage/edit-profile",
    },
    {
      name: userRole === "USER" ? "나의 문의내역" : "문의내역",
      link: "/mypage/inquiries",
    },
    {
      name: "로그아웃",
    },
  ];

  const handleClickMenu = (item: DropDownMenuItem) => {
    const { name, link } = item;
    if (name === "로그아웃") {
      setShow(true);
    } else {
      if (link) {
        router.push(link);
      }
    }
  };

  const onClose = () => setShow(false);

  const onConfirm = () => {
    setShow(false);
    changeLogout();
    logout();
  };

  return (
    <div
      className={`z-20 relative flex items-center gap-[16px] max-w-[219px] min-h-[42px] rounded-full py-[8px] px-[16px] ${
        !show && "cursor-pointer"
      }`}
      onMouseEnter={() => setIsDropDown(true)}
    >
      <div className="w-fit h-fit flex justify-center items-center gap-4 px-4 py-2 rounded-full bg-bg0">
        <div
          className="w-[24px] h-[24px] bg-[#E6F7FE] rounded-full flex justify-center items-center"
          style={{
            boxShadow: `
        0px 0.8px 0.8px -0.4px rgba(24, 39, 75, 0.08),
        0px 0.4px 0.8px -0.4px rgba(24, 39, 75, 0.12)
      `,
          }}
        >
          {userImg ? (
            <Image
              alt="profile-image"
              src={userImg}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <ProfileLogo />
          )}
        </div>
        <p className="max-w-[151px] min-h-[26px] leading-[26px] text-gray7 font-medium text-[16px] tracking-[-0.02em]">
          {userNickname || ""}님
        </p>
      </div>
      {isDropDown && (
        <ul
          onMouseLeave={() => setIsDropDown(false)}
          onMouseEnter={() => setIsDropDown(true)}
          className="flex flex-col items-center w-[252px] min-h-[298px] absolute top-full right-0 z-10 py-[16px] border rounded-[10px] border-gray3 bg-white overflow-hidden"
          style={{
            boxShadow: `
              0px 8px 24px -4px rgba(78, 78, 78, 0.08),
              0px 6px 12px -6px rgba(78, 78, 78, 0.12)
            `,
          }}
        >
          {dropDownMenu.map((item, index) => {
            const isFirstItem = index === 0;
            const isLastItem = index === dropDownMenu.length - 1;

            return (
              <li
                key={index}
                className={`
                  w-[252px] h-[48px] text-left cursor-pointer 
                  ${isLastItem ? "h-[58px]" : "h-[48px]"}
                  ${!isFirstItem ? "border-b border-gray2" : ""}
                  px-4 py-[11px] flex items-center hover:bg-bg0
                `}
                onClick={() => handleClickMenu(item)}
              >
                <button
                  disabled={logoutIsPending}
                  className=" leading-[26px] text-gray7 text-[16px] font-medium  tracking-[-0.02em]"
                >
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmModal
        show={show}
        onClose={onClose}
        title="로그아웃 하시겠습니까?"
        message="다시 로그인 하셔야합니다."
        onConfirm={onConfirm}
        closeText="취소"
        confirmText="로그아웃"
        isPending={logoutIsPending}
      />
    </div>
  );
};

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ProfileLogo } from "../../icon/ProfileLogo";
// import ConfirmModal from "../../ConfirmModal";
// import useLogout from "@/_hooks/fetcher/mypage/useLogout";
// import useAuthCheck from "@/_hooks/useAuthCheck";
// import { useAuthStore } from "@/utils/Store";
// import Image from "next/image";

// interface DropDownMenuItem {
//   name: string;
//   link?: string;
// }

// export const MypageButton = ({ userNickname }: { userNickname: string }) => {
//   const router = useRouter();
//   const [isDropDown, setIsDropDown] = useState(false);
//   const { data: authCheckData } = useAuthCheck();
//   const userRole = authCheckData?.data?.data?.role;
//   const [show, setShow] = useState(false);
//   const { mutate: logout, isPending: logoutIsPending } = useLogout();
//   const { logout: changeLogout } = useAuthStore();
//   const userImg = authCheckData?.data?.data?.imgUrl;

//   useEffect(() => {
//     if (show) {
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = "auto";
//       };
//     }
//   }, [show]);

//   const dropDownMenu = [
//     {
//       name: "마이페이지",
//       link: "/mypage",
//     },
//     {
//       name: "내가 쓴 게시물",
//       link: "/mypage/posts",
//     },
//     {
//       name: "내가 쓴 댓글",
//       link: "/mypage/comments",
//     },
//     {
//       name: "내 정보 수정",
//       link: "/mypage/edit-profile",
//     },
//     {
//       name: userRole === "USER" ? "나의 문의내역" : "문의내역",
//       link: "/mypage/inquiries",
//     },
//     {
//       name: "로그아웃",
//     },
//   ];

//   const handleClickMenu = (item: DropDownMenuItem) => {
//     const { name, link } = item;
//     if (name === "로그아웃") {
//       setShow(true);
//     } else {
//       if (link) {
//         router.push(link);
//       }
//     }
//   };

//   const onClose = () => setShow(false);

//   const onConfirm = () => {
//     setShow(false);
//     changeLogout();
//     logout();
//   };

//   return (
//     <div
//       className={`z-20 relative flex items-center gap-[16px] max-w-[219px] min-h-[42px] rounded-full py-[8px] px-[16px] ${
//         !show && "cursor-pointer"
//       }`}
//       onMouseEnter={() => setIsDropDown(true)}
//     >
//       <div className="w-fit h-fit flex justify-center items-center gap-4 px-4 py-2 rounded-full bg-bg0">
//         <div
//           className="w-[24px] h-[24px] bg-[#E6F7FE] rounded-full flex justify-center items-center"
//           style={{
//             boxShadow: `
//         0px 0.8px 0.8px -0.4px rgba(24, 39, 75, 0.08),
//         0px 0.4px 0.8px -0.4px rgba(24, 39, 75, 0.12)
//       `,
//           }}
//         >
//           {userImg ? (
//             <Image
//               alt="profile-image"
//               src={userImg}
//               width={24}
//               height={24}
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <ProfileLogo />
//           )}
//         </div>
//         <p className="max-w-[151px] min-h-[26px] leading-[26px] text-gray7 font-medium text-[16px] tracking-[-0.02em]">
//           {userNickname || ""}님
//         </p>
//       </div>
//       {isDropDown && (
//         <ul
//           onMouseLeave={() => setIsDropDown(false)}
//           onMouseEnter={() => setIsDropDown(true)}
//           className="flex flex-col items-center w-[252px] min-h-[298px] absolute top-full right-0 z-10 py-[16px] border rounded-[10px] border-gray3 bg-white overflow-hidden"
//           style={{
//             boxShadow: `
//               0px 8px 24px -4px rgba(78, 78, 78, 0.08),
//               0px 6px 12px -6px rgba(78, 78, 78, 0.12)
//             `,
//           }}
//         >
//           {dropDownMenu.map((item, index) => {
//             const isFirstItem = index === 0;
//             const isLastItem = index === dropDownMenu.length - 1;

//             return (
//               <li
//                 key={index}
//                 className={`
//                   w-full
//                   ${isLastItem ? "h-[58px]" : "h-[48px]"}
//                   ${!isFirstItem ? "border-b border-gray2" : ""}
//                   px-4 py-2 flex items-center hover:bg-bg0
//                 `}
//               >
//                 <button
//                   onClick={() => handleClickMenu(item)}
//                   disabled={logoutIsPending}
//                   className="text-gray7 text-[16px] font-medium w-full h-full text-left leading-[26px] tracking-[-0.02em]"
//                 >
//                   {item.name}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       <ConfirmModal
//         show={show}
//         onClose={onClose}
//         title="로그아웃 하시겠습니까?"
//         message="다시 로그인 하셔야합니다."
//         onConfirm={onConfirm}
//         closeText="취소"
//         confirmText="로그아웃"
//         isPending={logoutIsPending}
//       />
//     </div>
//   );
// };
