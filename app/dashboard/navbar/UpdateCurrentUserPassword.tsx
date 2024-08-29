"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type UpdatePasswordFormData = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

interface CloseModal {
  handleModalClose: () => void;
}

export default function UpdateCurrentUserPassword({
  handleModalClose,
}: CloseModal) {
  const { register, handleSubmit } = useForm<UpdatePasswordFormData>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const updatePassword: SubmitHandler<UpdatePasswordFormData> = async (
    data
  ) => {
    try {
      setLoading(true);

      const token = document.cookie.split("=")[1];

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const url = `http://127.0.0.1:3008/api/auth/updatePassword`;
      const res = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleModalClose();

      toast.success("Password reset successful");
      setLoading(false);
    } catch (err) {
      console.error("Error occurred:", err);
      toast.error("Failed to reset password. Please try again.");
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
    <Card className="px-12 py-10">
      <form
        className=" flex flex-col gap-4"
        onSubmit={handleSubmit(updatePassword)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="passwordCurrent">Current Password</Label>
          <div className=" relative">
            <Input
              id="passwordCurrent"
              type={showPassword ? "text" : "password"}
              {...register("passwordCurrent", { required: true })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={() => {
                setShowPassword((el) => !el);
              }}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">New Password</Label>
          <div className=" relative">
            <Input
              id="password"
              type={showNewPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={() => {
                setShowNewPassword((el) => !el);
              }}
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="passwordConfirm">Confirm New Password</Label>
          <div className=" relative">
            <Input
              id="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              {...register("passwordConfirm", { required: true })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={() => {
                setShowPasswordConfirm((el) => !el);
              }}
            >
              {showPasswordConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
          type="submit"
        >
          {loading ? loader : "Reset Password"}
        </Button>
      </form>
    </Card>
  );
}
