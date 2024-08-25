"use client";

import React from "react";
import useUser from "../../login/useUsers";
import us from "../../../public/assets/pro 4.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DashBoardNavbar() {
  const { curUser, logOut } = useUser();

  return (
    <div className="px-12 py-2 w-full flex justify-end border-gray-200 border-b border-solid">
      {curUser?.photo !== "" ? (
        <div className="">
          <Image
            className=" rounded-full w-11 h-11"
            src={curUser?.photo || us}
            alt="user photo"
            width={70}
            height={100}
          />
        </div>
      ) : (
        <Button className=" bg-pink-600 w-11 h-11 rounded-full text-slate-50 font-semibold">
          {curUser.name[0].toLocaleUpperCase()}
        </Button>
      )}
    </div>
  );
}