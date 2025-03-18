"use client";

import React from "react";
import LiveMatchPanel from "../LiveMatchPanel";
import CommentBox from "../CommentBox";
import BaseballGameTime from "./BaseballGameTime";

const BaseballTab = () => {
  return (
    <div className="w-[800px] min-h-[935px] flex flex-col gap-6">
      <BaseballGameTime />
      <div className="flex flex-col gap-3">
        <LiveMatchPanel />
        <CommentBox />
      </div>
    </div>
  );
};

export default BaseballTab;
