import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";

import logo from "../../public/images/image copy 11.png";
import log from "../../public/images/image.png";

export default function LoginPage() {
  return (
    <div className="bg-slate-100/80 h-svh overflow-y-scroll">
      <div className="md:w-[40svw] mx-auto px-4 pt-8 pb-7  md:pb-10">
        <div>
          <div className="flex justify-center mb-8">
            <Image src={log} alt="Logo" priority width={150} height={150} />
          </div>
          <h1 className="flex mb-12 justify-center font-semibold text-3xl text-slate-700">
            Log in to your account
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
