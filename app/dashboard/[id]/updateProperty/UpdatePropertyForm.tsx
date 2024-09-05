"use client";

import useSearchProperty from "@/app/components/property/useProperty";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
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

export default function UpdatePropertyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { properties } = useSearchProperty();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<FormData>();

  const singleProperty = properties.find((el) => el._id === id);

  useEffect(() => {
    if (singleProperty) {
      reset({
        about: singleProperty.about,
        type: singleProperty.type,
        bathrooms: singleProperty.bathrooms,
        bedrooms: singleProperty.bedrooms,
        garages: singleProperty.garages,
        price: singleProperty.price,
        city: singleProperty.city,
        zip: singleProperty.zip,
        address: singleProperty.address,
        size: singleProperty.size,
        latitude: singleProperty.position[0],
        longitude: singleProperty.position[1],
        description: singleProperty.description,
      });
    }
  }, [singleProperty, reset]);

  const handleUpdate: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      await axios.patch(
        `https://real-estate-api-azure.vercel.app/api/property/${id}`,
        data
      );

      toast.success("You have succefully updated");
      setIsLoading(false);
      reset();

      router.push("/dashboard");
    } catch (err) {
      toast.error("Property update failed");
      console.log("ERROR:", err);
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
    <div className="p-3 md:p-10 bg-slate-100">
      <p className="sm:text-[27px] text-[23px] mb-4 font-semibold flex justify-center">
        Updating your property
      </p>

      <div className="flex items-center justify-center">
        <Card className="p-9 md:w-[75%]">
          <form
            className="w-full mx-auto mt-12"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <div className="grid grid-cols-2 gap-5">
              <Input
                type="text"
                {...register("about", { required: "This field is required" })}
                placeholder="Add small description about property"
              />
              {errors.about && (
                <p className="text-red-500">{errors.about.message}</p>
              )}

              <Controller
                name="type"
                control={control}
                defaultValue={singleProperty?.type || ""}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                )}
              />

              <Input
                type="number"
                {...register("bathrooms", {
                  required: "This field is required",
                })}
                placeholder="Bathrooms"
              />
              {errors.bathrooms && (
                <p className="text-red-500">{errors.bathrooms.message}</p>
              )}

              <Input
                type="number"
                {...register("bedrooms", {
                  required: "This field is required",
                })}
                placeholder="Bedrooms"
              />
              {errors.bedrooms && (
                <p className="text-red-500">{errors.bedrooms.message}</p>
              )}

              <Input
                type="number"
                {...register("garages", { required: "This field is required" })}
                placeholder="Garages"
              />
              {errors.garages && (
                <p className="text-red-500">{errors.garages.message}</p>
              )}

              <Input
                type="number"
                {...register("price", { required: "This field is required" })}
                placeholder="Price"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}

              <Input
                type="number"
                {...register("size", { required: "This field is required" })}
                placeholder="Plot Size"
              />
              {errors.size && (
                <p className="text-red-500">{errors.size.message}</p>
              )}

              <Input
                type="text"
                {...register("city", { required: "This field is required" })}
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}

              <Input
                type="number"
                {...register("zip", { required: "This field is required" })}
                placeholder="Zip Code"
              />
              {errors.zip && (
                <p className="text-red-500">{errors.zip.message}</p>
              )}

              <Input
                type="text"
                {...register("address", { required: "This field is required" })}
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}

              <Input
                type="number"
                step="0.00001"
                {...register("latitude", {
                  required: "This field is required",
                })}
                placeholder="Latitude"
              />
              {errors.latitude && (
                <p className="text-red-500">{errors.latitude.message}</p>
              )}

              <Input
                type="number"
                step="0.00001"
                {...register("longitude", {
                  required: "This field is required",
                })}
                placeholder="Longitude"
              />
              {errors.longitude && (
                <p className="text-red-500">{errors.longitude.message}</p>
              )}
            </div>
            <Textarea
              className="mt-5 h-40"
              {...register("description", {
                required: "This field is required",
              })}
              placeholder="Add your Property Description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full mt-8"
              type="submit"
              disabled={isLoading === true}
            >
              {isLoading === true ? loader : "Update Property"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
