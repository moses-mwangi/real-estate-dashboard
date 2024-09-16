import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import logo1 from "../../public/images/image copy 6.png";
import logo2 from "../../public/images/image copy 7.png";
import logo3 from "../../public/images/image copy.png";

export default function LoginPage() {
  return (
    <div className="bg-slate-100/80 h-svh overflow-y-scroll">
      <div className="md:w-[40svw] mx-auto px-4 pt-5 pb-7  md:pb-10">
        <div>
          <div className="flex justify-center mb-6">
            <Image src={logo3} alt="Logo" priority width={250} height={150} />
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
