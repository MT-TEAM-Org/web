"use client";

import React, { useState } from "react";
import FootballGameTime from "./FootballGameTime";
import LiveMatchPanel from "../LiveMatchPanel";
import CommentBox from "../CommentBox";

const FootballTab = () => {
  return (
    <div className="w-[800px] min-h-[1455px] flex flex-col gap-6 items-center">
      <div>
        <FootballGameTime />
      </div>
      <div className="flex flex-col gap-3">
        <LiveMatchPanel />
        <CommentBox />
      </div>
    </div>
  );
};

export default FootballTab;
