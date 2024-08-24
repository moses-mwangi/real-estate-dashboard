"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
};

export default function PropertyForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleUpload = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

    if (data.images.length < 5) {
      toast.error("Please select at least 5 images.");
      setLoading(false);
      return;
    }

    // Append all images
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    // Append other property details
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

    console.log(data);
    console.log(formData);
    console.log(formData.getAll("images"));
    console.log(formData.getAll("images").length);
    console.log(formData.get("images"));

    try {
      const res = await axios.post(
        "http://127.0.0.1:3008/api/property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Property successfully added");
    } catch (error) {
      console.error("Error uploading property:", error);
      toast.error("Error uploading property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className=" mx-auto mt-5 w-[60svw] px-6 py-8 bg-slate-100">
      <form
        className="w-full mx-auto mt-12 grid grid-cols-2 gap-5"
        onSubmit={handleSubmit(handleUpload)}
      >
        <Input
          type="text"
          {...register("about", { required: true })}
          placeholder="About"
        />
        <Input
          type="text"
          {...register("type", { required: true })}
          placeholder="Type"
        />
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
        <Textarea
          {...register("description", { required: true })}
          placeholder="Description"
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

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Card>
  );
}
