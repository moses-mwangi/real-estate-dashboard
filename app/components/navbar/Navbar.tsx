"use client";

import React, { useState } from "react";
import UserDetails from "../user/UserDetails";

export default function DashBoardNavbar() {
  return (
    <div className="border-b border-solid border-slate-200">
      <UserDetails />
    </div>
  );
}
