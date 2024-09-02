"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from "../components/user/useUser";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  role: string;
}

export default function AddingAgentPage() {
  const [field, setField] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const { curUser, allUsers } = useUser();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.role || !data.email || !data.name) {
      toast.error("All field should be filled");
      return;
    }

    const findPostedUser = allUsers?.find(
      (el) => el.email === data.email && el.name === data.name
    );

    if (!findPostedUser) {
      toast.error("No user with those credentials");
      return;
    }

    if (findPostedUser._id === curUser?._id) return null;

    if (curUser?.role !== "admin") {
      toast.error("Only admin user can perfom that task");
      return;
    }

    const update = { role: data.role };

    try {
      setIsLoading(true);

      const id = findPostedUser?._id;

      await axios.patch(`http://127.0.0.1:3008/api/users/${id}`, update);

      toast.success("You have succesfully added a new agent");
      setIsLoading(false);

      push("/dashboard");

      reset();
    } catch (err) {
      toast.error("Failed to add agent");
      setIsLoading(false);
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
    <div className=" bg-slate-200 h-[90svh]">
      <p className="text-[27px] text-gray-800/90 font-semibold flex justify-center pt-10">
        Adding New Agent From the Existing User
      </p>
      <div className="flex justify-center mt-16">
        <Card className="p-5 w-[60%]">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label>Email Address</Label>
              <Input {...register("email")}></Input>
            </div>
            <div>
              <Label>User Name</Label>
              <Input {...register("name")}></Input>
            </div>
            <div>
              <Label>User Role</Label>

              <Controller
                name="role"
                control={control}
                defaultValue="user"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Button
                disabled={isLoading === true}
                className=" w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading == false ? "Add new Agent" : loader}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
