"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";

const sorts = [{ label: "price" }, { label: "createdAt" }, { label: "name" }];

export default function FilterProperty() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-inherit border-none max-w-none">
        <ListFilter className="w-7 h-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {sorts.map((el) => (
            <DropdownMenuItem
              key={el.label}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("FilteredBy", el.label);
                router.push("?" + params.toString());
                router.refresh();
              }}
            >
              FilteredBy ( {el.label} )
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
