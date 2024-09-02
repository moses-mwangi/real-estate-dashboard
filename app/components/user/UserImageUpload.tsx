"use client";

import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { IoMdCloudUpload } from "react-icons/io";
import Cropper, { Area } from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Image from "next/image";
import useUser from "./useUser";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        resolve(null);
      }
    }, "image/jpeg");
  });
}

function rotateSize(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

type FormData = {
  images: FileList;
};

function UserImageUpload() {
  const { curUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>();

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = URL.createObjectURL(file);
      setImage(imageDataUrl);
      setFile(file);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation
        );
        setCroppedImage(croppedImage);
        setImage(null);
      } catch (e) {
        console.error(e);
      }
    }
  }, [croppedAreaPixels, rotation, image]);

  const handleImageSubmission: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();

    if (!croppedAreaPixels || !image) return null;

    const croppedImage = await getCroppedImg(
      image,
      croppedAreaPixels,
      rotation
    );

    // if (croppedImage) {
    //   const response = await fetch(croppedImage);
    //   const blob = await response.blob();
    //   const file = new File([blob], "croppedImage.jpg", { type: "image/jpeg" });
    //   formData.append("photo", file);
    // }

    if (file) {
      // const response = await fetch(croppedImage);
      // const blob = await response.blob();
      // const file = new File([blob], "croppedImage.jpg", { type: "image/jpeg" });
      formData.append("photo", file);
    }

    try {
      const token = document.cookie.split("=")[1];

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      console.log(token, formData.get("photo"));
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

      toast.success("Image successfully added");
      setLoading(false);
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
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-[1px] bg-black bg-opacity-50">
      <div className="w-[50%] bg-white p-6 rounded-md shadow-lg">
        <Card className="p-4 w-full">
          <div className="flex flex-col gap-2 items-center justify-center mb-8">
            <div className="flex justify-center flex-col items-center">
              <div className="text-xl font-medium">{curUser?.name}</div>
            </div>
            <form onSubmit={handleSubmit(handleImageSubmission)}>
              <div className="w-[70px] h-[70px]">
                {croppedImage ? (
                  <Image
                    className="w-full h-full object-cover rounded-full"
                    src={croppedImage}
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
            </form>
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
              <div className="relative w-full rounded-md h-full">
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={2 / 2}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={true}
                  style={{ containerStyle: { height: "100%", width: "100%" } }}
                />
              </div>
            )}
          </div>
          {image && (
            <div className="flex flex-col mt-3 items-center">
              <label className="text-gray-700 flex gap-1 text-[15px] font-medium w-full">
                Rotate
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="rotate"
                  onChange={(_, value) => setRotation(value as number)}
                  className="ml-4 w-full"
                />
              </label>
              <label className="text-gray-700 flex gap-1 text-[15px] w-full">
                Zoom
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="zoom"
                  onChange={(_, value) => setZoom(value as number)}
                  className="ml-4 w-full"
                />
              </label>
              <div className="mt-2">
                <Button
                  onClick={showCroppedImage}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {loading === true ? loader : "Save"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default UserImageUpload;
