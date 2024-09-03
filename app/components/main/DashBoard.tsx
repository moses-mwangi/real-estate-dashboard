import React, { Suspense } from "react";
import CurrentUserProperties from "../property/UserProperties";
import DashBoardOperation from "./DashBoardOperation";

export default function DashBoardMain() {
  return (
    <div className="h-[90svh] bg-slate-100 p-10 overflow-y-scroll">
      <DashBoardOperation />
      <Suspense fallback={<p>Loading...</p>}>
        <CurrentUserProperties />
      </Suspense>
    </div>
  );
}
