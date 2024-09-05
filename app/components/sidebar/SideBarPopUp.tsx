"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import Logo from "./Logo";
import SideBarActivity from "./SideBarActivity";
import { Separator } from "@/components/ui/separator";
import { FaListUl } from "react-icons/fa6";

export default function SideBarPopUp() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="ml-3 hover:bg-slate-200 cursor-pointer flex items-center justify-center rounded-full w-11 h-11">
            <FaListUl className="w-7 h-7 text-gray-800" />
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            <Logo />
            <Separator />
            <SideBarActivity />
          </div>
          <SheetFooter>
            <SheetClose asChild></SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
