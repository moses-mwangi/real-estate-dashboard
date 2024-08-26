"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

// Define the TypeScript type for the form data
type UpdatePasswordFormData = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

export default function UpdateCurrentUserPassword() {
  const { register, handleSubmit } = useForm<UpdatePasswordFormData>();
  const [loading, setLoading] = useState(false);

  const updatePassword: SubmitHandler<UpdatePasswordFormData> = async (
    data
  ) => {
    console.log("Form submitted with data:", data);
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

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

      console.log("API response:", res.data);
      toast.success("Password reset successful");
      setLoading(false);
    } catch (err) {
      console.error("Error occurred:", err);
      toast.error("Failed to reset password. Please try again.");
      setLoading(false); // Ensure this is called even if an error occurs
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
      <form onSubmit={handleSubmit(updatePassword)}>
        <div>
          <Label htmlFor="passwordCurrent">Current Password</Label>
          <Input
            id="passwordCurrent"
            type="password"
            {...register("passwordCurrent", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="passwordConfirm">Confirm New Password</Label>
          <Input
            id="passwordConfirm"
            type="password"
            {...register("passwordConfirm", { required: true })}
          />
        </div>
        <Button className="w-full mt-2" type="submit">
          {loading ? loader : "Reset Password"}
        </Button>
      </form>
    </Card>
  );
}
