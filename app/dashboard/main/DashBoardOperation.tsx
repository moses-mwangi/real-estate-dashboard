"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import SortProperty from "./SortProperty";
import FilterProperty from "./FilterProperty";

export default function DashBoardOperation() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-7">
      <Suspense fallback={<p>Loading...</p>}>
        <SortProperty />
      </Suspense>
      <div className="flex items-center gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <FilterProperty />
        </Suspense>
        <Button
          className=" bg-blue-600 h-[39px] hover:bg-blue700"
          onClick={() => {
            router.push("/addProperty");
          }}
        >
          <PlusCircle className="h-5 w-5 mr-[4px]" /> Add Property
        </Button>
      </div>
    </div>
  );
}
