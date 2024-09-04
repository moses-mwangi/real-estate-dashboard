"use client";

import React from "react";
import Logo from "./Logo";
import { Separator } from "@/components/ui/separator";
import SideBarActivity from "./SideBarActivity";

export default function DashBoardSideBar() {
  return (
    <div className={`border-gray-200 border-r border-solid`}>
      <Logo />
      <Separator />
      <SideBarActivity />
    </div>
  );
}
