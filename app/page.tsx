"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  images: File[];
}

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const params = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleUpload = async (data: FormData) => {
    const formData = new FormData();

    // Append each selected file to FormData
    data.images.forEach((file, index) => {
      formData.append(`images`, file);
    });

    toast.success("Waiting uploading");

    try {
      const res = await axios.post(
        "http://127.0.0.1:3008/api/upload",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrls(res.data.urls); // Assuming the API returns an array of URLs
      toast.success("Images successfully uploaded");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images");
    }
  };

  return (
    <div className=" hidden">
      <form
        className="w-[50svh] mx-auto mt-20"
        onSubmit={handleSubmit(handleUpload)}
      >
        <h2 className="text-lg font-semibold">Images</h2>

        <div className="flex gap-4 items-center">
          <Input
            type="file"
            multiple={true}
            {...register("images", {
              required: true,
              // validate: (files) =>
              //   files.length >= 5 || "Please select at least 5 images.",
            })}
          />
        </div>

        <Button type="submit">Upload Images</Button>
      </form>
      <div className="mt-6">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Uploaded Image ${index + 1}`}
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
}
