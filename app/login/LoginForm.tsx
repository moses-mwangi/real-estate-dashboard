"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "../components/user/useUser";
import toast from "react-hot-toast";
import axios from "axios";

const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type Login = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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

  const handleLogin: SubmitHandler<Login> = async (data) => {
    const validateUser = allUsers?.find((el) => el.email === data.email);
    console.log(data, allUsers);

    if (!validateUser) {
      toast.error("Invalid email and password");
      return;
    }

    const filterUser =
      validateUser?.role === "agent" || validateUser?.role === "admin";

    if (!filterUser) {
      toast.error("Only the admin users can log in");
      return;
    }

    try {
      setLoading(true);
      const url = "https://real-estate-api-azure.vercel.app/api/auth/login";
      const res = await axios.post(url, data);

      toast.success("Login successful");
      const token = res.data.token;
      reset();
      router.push("/dashboard");

      document.cookie = `token=${token}; path=/`;

      setLoading(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to login. Please try again.");
      console.log("Error", err);
      setLoading(false);
    }
  };

  function togglePassword() {
    setShowPassword((el) => !el);
  }

  function togglePasswordConfirm() {
    setShowPasswordConfirm((el) => !el);
  }

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
      <form className="grid grid-cols-1" onSubmit={handleSubmit(handleLogin)}>
        <div className="grid grid-cols-1 gap-2 mb-5">
          <Label className="font-medium text-gray-700">Email Address</Label>
          <Input type="text" {...register("email")} />
          {errors.email && (
            <span className="text-red-600 font-medium text-[13px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 mb-2">
          <Label className="font-medium text-gray-700">Password</Label>
          <div className=" relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={togglePassword}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-600 text-[13px]">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 mb-2">
          <Label className="font-medium text-gray-700">Confirm Password</Label>
          <div className="relative">
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              {...register("passwordConfirm")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={togglePasswordConfirm}
            >
              {showPasswordConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.passwordConfirm && (
            <div className="text-red-600 text-[13px]">
              {errors.passwordConfirm.message}
            </div>
          )}
        </div>
        <p
          className=" text-[12px] hover:text-blue-700 font-medium text-blue-600 cursor-pointer mb-4"
          onClick={() => {
            router.push("/forgotPassword");
          }}
        >
          Forgot Password
        </p>
        <Button
          type="submit"
          className=" w-full disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? loader : "Log In"}
        </Button>
      </form>
    </Card>
  );
}
