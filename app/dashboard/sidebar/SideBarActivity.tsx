"use client";

import {
  HomeIcon,
  House,
  HouseIcon,
  LucideHouse,
  LucideUsers2,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LiaStoreSolid } from "react-icons/lia";
import { LuExternalLink } from "react-icons/lu";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "My Website",
    icon: <LuExternalLink className="w-[22px] h-[22px]" />,
    ref: "https://food-delivery-bkrk.vercel.app/",
  },
  {
    label: "Dashboard",
    icon: <HomeIcon className="w-[22px] h-[22px]" />,
    ref: "/dashboard",
  },
  {
    label: "Add Property",
    icon: <LucideHouse className="w-[22px] h-[22px]" />,
    ref: "/addProperty",
  },
  {
    label: "Add Agents",
    icon: <LucideUsers2 className="w-[22px] h-[22px]" />,
    ref: "/addAgent",
  },
  {
    label: "Setting",
    icon: <Settings className="w-[22px] h-[22px]" />,
    ref: "/setting",
  },
];

export default function SideBarActivity() {
  const path = usePathname();
  return (
    <div className="px-3 pt-8 flex flex-col gap-2">
      {links.map((el) => (
        <Link
          key={el.label}
          href={el.ref}
          className={`${
            el.ref === path ? " bg-gray-200" : ""
          }   flex gap-2 items-center py-2 px-4 rounded-sm hover:bg-gray-200 transition-all duration-150`}
        >
          <span
            className={`${
              el.ref === path ? " text-blue-700/90" : " text-gray-500"
            }  font-medium`}
          >
            {el.icon}
          </span>
          <span
            className={`${
              el.ref === path ? " text-blue-700/90" : " text-gray-700"
            } font-medium`}
          >
            {el.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
