"use client";

import useUser from "@/app/components/user/useUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type UpdateMeFormData = {
  // role: string;
  name: string;
};

interface CloseModal {
  handleModalClose: () => void;
}

export default function UpdateCurrentUser({ handleModalClose }: CloseModal) {
  const { register, handleSubmit } = useForm<UpdateMeFormData>();
  const [loading, setLoading] = useState(false);
  const { curUser } = useUser();

  const updateMe: SubmitHandler<UpdateMeFormData> = async (data) => {
    console.log("data:", data);

    try {
      setLoading(true);

      const token = document.cookie.split("=")[1];

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const url = `http://127.0.0.1:3008/api/users/updateMe`;
      const res = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleModalClose();

      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
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
    <Card className="px-12 py-10">
      <form onSubmit={handleSubmit(updateMe)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[4px]">
            <Label htmlFor="name">User Name</Label>
            <Input
              defaultValue={curUser?.name}
              type="text"
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <Label htmlFor="name">User Email</Label>
            <Input defaultValue={curUser?.email} disabled type="text" />
          </div>

          <div className="flex flex-col gap-[4px]">
            <Label className="text-[15px]" htmlFor="role">
              User Role
            </Label>
            <Input
              defaultValue={curUser?.role}
              disabled
              type="text"
              // {...register("role")}
            />
          </div>
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
          type="submit"
          disabled={loading}
        >
          {loading ? loader : "Update Profile"}
        </Button>
      </form>
    </Card>
  );
}
