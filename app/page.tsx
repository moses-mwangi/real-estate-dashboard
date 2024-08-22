"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  images: File[];
}

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      images: [], // Initialize with an empty array
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "image" as never,
  });

  const handleUpload = async (data: FormData) => {
    const formData = new FormData();

    console.log(data.images);

    // Append each selected file to FormData
    // data.image.forEach((file, index) => {
    //   formData.append(`image${index}`, file);

    // });

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    try {
      console.log(formData.get("images"));

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
    <div>
      <form
        className="w-[50svh] mx-auto mt-20"
        onSubmit={handleSubmit(handleUpload)}
      >
        <div>
          <h2 className="text-lg font-semibold">Images</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-center">
              <Input
                type="file"
                {...register(`images`, {
                  required: true,
                })}
              />
              <Button
                className="bg-blue-600/85 hover:bg-blue-700 mt-6"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            className="bg-blue-600/85 hover:bg-blue-700 mt-3"
            type="button"
            onClick={() => append({ image: null })}
          >
            Add Images
          </Button>
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
        {imageUrls && <p>IMAGES AVAILABLE</p>}
      </div>
    </div>
  );
}
