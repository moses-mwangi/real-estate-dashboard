"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import SortProperty from "../property/SortProperty";
import useSearchProperty from "../property/useProperty";

export default function DashBoardOperation() {
  const router = useRouter();
  const { userProperties } = useSearchProperty();

  return (
    <div className="flex justify-between items-center mb-7">
      <div>
        <p className="font-medium text-2xl">
          Currently you have {userProperties.length} property
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <SortProperty />
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
