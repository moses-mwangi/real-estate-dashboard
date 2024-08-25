import React from "react";
import CurrentUserProperties from "./UserProperties";
import { Button } from "@/components/ui/button";
import useSearchProperty from "@/app/addProperty/useSearchProperty";

export default function DashBoardMain() {
  const { properties } = useSearchProperty();
  return (
    <div className="h-[90svh] bg-slate-100 p-10 overflow-y-scroll">
      <CurrentUserProperties />
    </div>
  );
}
