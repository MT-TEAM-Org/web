import React from "react";
import ActiveChatTwo from "./ActiveChatTwo";
import ActiveChatThree from "./ActiveChatThree";

const ActiveChat = () => {
  return (
    <div className="w-full max-w-[328px] h-full max-h-[442px]">
      <ActiveChatTwo />
      <ActiveChatTwo />
      <ActiveChatThree />
      <ActiveChatTwo />
      <ActiveChatTwo />
      <ActiveChatTwo />
      <ActiveChatThree />
    </div>
  );
};

export default ActiveChat;
