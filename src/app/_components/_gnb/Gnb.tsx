"use client";

import Header from "./Header";
import Navbar from "./Navbar";
import Toast from "../Toast";

interface UserData {
  id: number;
  email: string;
  tel: string;
  nickname: string;
  role: string;
  type: string;
  status: string;
}

export default function Gnb() {
  return (
    <>
      <div className="w-full fixed top-0 bg-white shadow-[0px_6px_10px_0px_rgba(0,0,0,0.05)] z-50 h-[120px]">
        <Header />
        <Navbar />

        <Toast
          title="title text"
          message="body text text text text"
          type="success"
        />
      </div>
      <div className="pt-[120px]"></div>
    </>
  );
}
