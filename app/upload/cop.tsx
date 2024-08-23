"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "image" as never,
  });

  const handleUpload = async (data: FormData) => {
    setLoading(true);
    const formData = new FormData();

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

    try {
      if (data.images.length > 1) {
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
      } else {
        toast.success("Images should be more than one");
      }
    } catch (error) {
      console.error("Error uploading property:", error);
      toast.error("Error uploading property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="w-[90svh] mx-auto mt-12 grid grid-cols-2 gap-5"
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
        {errors.images && <span>At least one image is required</span>}

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </div>
  );
}
