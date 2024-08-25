import Image from "next/image";
import React from "react";
import logo from "../../../public/images/image.png";

export default function Logo() {
  return (
    <div>
      <Image
        className="py-6 pl-3"
        src={logo}
        alt="logo"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}
