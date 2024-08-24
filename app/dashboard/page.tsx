"use client";

import React from "react";
import useUser from "../login/useUsers";

export default function DashBoard() {
  const { curUser } = useUser();

  return (
    <div>
      <p>DASHBOARD</p>
      <p>{curUser ? curUser.email : "NO LOGGEDIN USER"}</p>
    </div>
  );
}
