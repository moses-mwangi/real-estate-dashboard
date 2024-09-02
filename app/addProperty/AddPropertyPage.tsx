"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUser from "../components/user/useUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type FormData = {
  images: FileList;
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  price: number;
  city: string;
  zip: number;
  address: string;
  size: number;
  userId: string;
  latitude: number;
  longitude: number;
};

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const { curUser } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setValue(name, value);
  };

  const handleUpload = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

    if (data.images.length < 5) {
      toast.error("Please select at least 5 images.");
      setLoading(false);
      return;
    }

    const position = [data.latitude.toString(), data.longitude.toString()];

    // Append all images
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    for (let i = 0; i < position.length; i++) {
      formData.append("position", position[i]);
    }

    formData.append("description", data.description);
    formData.append("about", data.about);
    formData.append("type", data.type);
    formData.append("bathrooms", data.bathrooms.toString());
    formData.append("bedrooms", data.bedrooms.toString());
    formData.append("garages", data.garages.toString());
    formData.append("price", data.price.toString());
    formData.append("city", data.city);
    formData.append("zip", data.zip.toString());
    formData.append("address", data.address);
    formData.append("size", data.size.toString());
    formData.append("userId", data.userId);

    console.log(formData.get("position"));

    try {
      const token = document.cookie.split("=")[1];

      if (!token) return;

      const res = await axios.post(
        "http://127.0.0.1:3008/api/property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      reset();
      toast.success("Property successfully added");
      router.push("/dashboard");
      reset();
    } catch (error) {
      console.error("Error uploading property:", error);
      toast.error("Error uploading property");
    } finally {
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
    <div className="bg-slate-100 h-[88svh] p-10 overflow-y-scroll">
      <p className=" flex justify-center font-semibold text-gray-800 mb-11 text-3xl">
        Adding new property to your List
      </p>
      <Card className="mx-auto w-[60svw] px-6 py-8">
        <form
          className="w-full mx-auto mt-12"
          onSubmit={handleSubmit(handleUpload)}
        >
          <div className=" grid grid-cols-2 gap-5">
            <Input
              type="text"
              {...register("about", { required: true })}
              placeholder="Add small description about property"
            />

            <div>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="w-full text-[13px] text-slate-500">
                  <SelectValue placeholder="Property Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Property Category
                    </SelectLabel>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Apartment"
                    >
                      Apartment
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Penthouse"
                    >
                      Penthouse
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Mansion"
                    >
                      Mansion
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Villa"
                    >
                      Villa
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="number"
              {...register("bathrooms", { required: true })}
              placeholder="Bathrooms"
            />
            <Input
              type="number"
              {...register("bedrooms", { required: true })}
              placeholder="Bedrooms"
            />
            <Input
              type="number"
              {...register("garages", { required: true })}
              placeholder="Garages"
            />

            <Input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
            />
            <Input
              type="number"
              {...register("size", { required: true })}
              placeholder="Plot Size"
            />
            <Input
              type="text"
              {...register("city", { required: true })}
              placeholder="City"
            />
            <Input
              type="number"
              {...register("zip", { required: true })}
              placeholder="Zip Code"
            />
            <Input
              type="text"
              {...register("address", { required: true })}
              placeholder="Address"
            />

            <Input
              defaultValue={curUser?._id}
              {...register("userId", { required: true })}
              type="text"
            />

            <Input
              type="number"
              step="0.00001"
              {...register("latitude", { required: true })}
              placeholder="Latitude"
            />
            <Input
              type="number"
              step="0.00001"
              {...register("longitude", { required: true })}
              placeholder="Longitude"
            />

            <div>
              <Input
                type="file"
                multiple={true}
                {...register("images", {
                  required: true,
                  validate: (files) =>
                    files.length >= 5 || "Please select at least 5 images.",
                })}
              />
              {errors.images && (
                <span className="text-[13px] font-medium text-red-600">
                  {errors.images.message}
                </span>
              )}
            </div>
          </div>
          <Textarea
            className="mt-5 h-40"
            {...register("description", { required: true })}
            placeholder="Add your Property Description"
          />

          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full mt-8"
            type="submit"
            disabled={loading}
          >
            {loading ? loader : "Post Property"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
