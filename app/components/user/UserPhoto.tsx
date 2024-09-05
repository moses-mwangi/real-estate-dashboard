"use client";

import useUser from "@/app/components/user/useUser";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import us from "../../../public/assets/pro 4.png";

export default function UserPhoto() {
  const { curUser } = useUser();

  return (
    <div className="pr-4 sm:pr-10 py-2 w-full flex justify-end">
      {curUser?.photo ? (
        <div className=" w-[43px] sm:w-[50px] h-[43px] sm:h-[50px]">
          <Image
            className="rounded-full h-full  w-full object-cover"
            src={curUser?.photo}
            alt="user photo"
            width={200}
            height={300}
          />
        </div>
      ) : (
        <Button className=" bg-pink-600 hover:bg-pink-700 w-12 h-12 rounded-full text-slate-50 font-semibold">
          {curUser?.name[0].toLocaleUpperCase()}
        </Button>
      )}
    </div>
  );
}
