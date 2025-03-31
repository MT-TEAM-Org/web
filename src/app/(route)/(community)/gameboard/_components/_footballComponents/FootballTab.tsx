"use client";

import React, { useState } from "react";
import FootballGameTime from "./FootballGameTime";
import LiveMatchPanel from "../LiveMatchPanel";

const FootballTab = () => {
  return (
    <div className="w-[800px] min-h-[1455px] flex flex-col gap-6 items-center">
      <div className="w-[800px]">
        <FootballGameTime />
      </div>
      <div className="flex flex-col gap-3">
        <LiveMatchPanel />
      </div>
    </div>
  );
};

export default FootballTab;
