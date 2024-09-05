"use client";

import React, { useState } from "react";
import UserDetails from "../user/UserDetails";
import SideBarPopUp from "../sidebar/SideBarPopUp";

export default function DashBoardNavbar() {
  return (
    <div className="border-b flex items-center gap-3 justify-between border-solid border-slate-200">
      <div>
        <SideBarPopUp />
      </div>
      <UserDetails />
    </div>
  );
}
