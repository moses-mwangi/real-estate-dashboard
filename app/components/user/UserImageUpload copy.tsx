"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { IoMdCloudUpload } from "react-icons/io";
import Image from "next/image";
import useUser from "./useUser";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type FormData = {
  images: FileList;
};

interface Props {
  setIsUpload: React.Dispatch<React.SetStateAction<boolean>>;
  isUpload: boolean;
}

function UserImageUpload({ setIsUpload, isUpload }: Props) {
  const { curUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit } = useForm<FormData>();

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = URL.createObjectURL(file);
      setImage(imageDataUrl);
      setFile(file);
    }
  };

  const handleImageSubmission = async () => {
    if (!file) return toast.error("Please select an image to upload.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = document.cookie.split("=")[1];
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:3008/api/users/updateImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Image successfully uploaded");
      setIsUpload(false); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] bg-black bg-opacity-70">
      <div className="relative w-[400px]  p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={() => setIsUpload(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <Card className="p-4 mt-6 w-full">
          <div className="flex flex-col gap-2 items-center justify-center mb-8">
            <div className="flex justify-center flex-col items-center">
              <div className="text-xl font-medium">{curUser?.name}</div>
            </div>
            <div className="w-[70px] h-[70px]">
              {image ? (
                <Image
                  className="h-full w-auto object-cover rounded-full"
                  src={image}
                  alt="Cropped Image"
                  width={50}
                  height={50}
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center font-medium text-[17px] text-slate-100 bg-pink-500">
                  {curUser?.name[0].toLocaleUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-100 rounded-md flex justify-center items-center h-48">
            {!image ? (
              <label className="cursor-pointer">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <IoMdCloudUpload className="w-14 h-14" />
                  <p className="text-xl font-medium pb-2">Upload image</p>
                </div>
                <Input
                  className="hidden"
                  type="file"
                  name="cover"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            ) : (
              <div className="relative w-auto rounded-md h-full">
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt="logo"
                  className=" w-full h-full"
                />
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button
              className=" w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit(handleImageSubmission)}
            >
              {loading ? loader : "Upload"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserImageUpload;
