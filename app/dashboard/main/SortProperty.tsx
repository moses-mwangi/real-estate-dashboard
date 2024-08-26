"use client";

import { Card } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const periods = [
  { label: "Date", value: "date" },
  { label: "Bedrooms", value: "bedrooms" },
  { label: "Bathrooms", value: "Bathrooms" },
];

export default function SortProperty() {
  const path = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();

  const match = searchParam.get("sortBy") ? searchParam.get("sortBy") : "date";

  return (
    <Card className="flex md:flex-row flex-col  gap-4 rounded-sm py-[3px] px-2">
      {periods.map((period) => (
        <span
          key={period.label}
          className={`${
            period.value.toString() === match
              ? "bg-blue-600 text-slate-200"
              : ""
          } hover:bg-blue-600 px-3 py-[5px] text-slate-700 hover:text-slate-100  rounded-sm cursor-pointer transition-colors`}
          onClick={() => {
            const params = new URLSearchParams(searchParam);
            params.set("sortBy", period.value.toString());
            const query = params.size ? "?" + params.toString() : "";

            router.push(`?${params.toString()}`);
          }}
        >
          {period.label}
        </span>
      ))}
    </Card>
  );
}
