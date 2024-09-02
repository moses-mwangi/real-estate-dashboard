"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import useUser from "../components/user/useUsers";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type Login = z.infer<typeof loginSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { allUsers } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const handleForgotPassword: SubmitHandler<Login> = async (data) => {
    const validateUser = allUsers?.find((el) => el.email === data.email);

    if (!validateUser) {
      toast.error("Invalid Email Address");
      return;
    }

    try {
      setLoading(true);
      const url = "http://127.0.0.1:3008/api/auth/forgotPassword";
      const res = await axios.post(url, data);

      toast.success("Emal sent successful");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      toast.error("Failed to send email. Please try again.");
      console.log("Error", err);
      setLoading(false);
    }
  };

  const loader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  return (
    <Card className="w-full shadow-xl border-[1px] px-9 py-9">
      <form
        className="grid grid-cols-1"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <div className="grid grid-cols-1 gap-2 mb-5">
          <Label className="font-medium text-gray-700">Email Address</Label>
          <Input type="text" {...register("email")} />
          {errors.email && (
            <span className="text-red-600 font-medium text-[13px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex justify-between gap-12 items-center">
          <Button
            type="submit"
            className=" w-full disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? loader : "Send Email"}
          </Button>
          <Card
            className="w-full cursor-pointer font-medium text-card text-sm flex justify-center py-[10px] rounded-md bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Card>
        </div>
      </form>
    </Card>
  );
}
