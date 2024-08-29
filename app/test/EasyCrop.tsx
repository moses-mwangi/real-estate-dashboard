"use client";

import React, { useCallback, useState } from "react";
import Slider from "@mui/material/Slider";
import Cropper, { Area } from "react-easy-crop";
import Image from "next/image";

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Needed to avoid CORS issues on the image
    image.src = url;
  });

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

// Main function to get cropped image
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

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Set canvas size to match the bounding box
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

  // Set canvas size to the final desired crop size
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

// Main Cropper component
const EasyCrop: React.FC<{ image: string | null }> = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

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
      } catch (e) {
        console.error(e);
      }
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}
      >
        Crop
      </button>
      <div
        className="relative"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="absolute inset-0">
          <Cropper
            image={image || ""}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={2 / 2}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomWithScroll={true}
            showGrid={true}
            maxZoom={3}
            cropShape="round"
          />
        </div>
        <div className=" flex flex-col items-center">
          <label className="text-gray-700 w-full">
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
          <label className="text-gray-700 w-full">
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
        </div>
      </div>
      <div className="mt-4">
        {croppedImage && (
          <Image
            width={300}
            height={200}
            className="rounded border border-gray-300 shadow-md"
            src={croppedImage}
            alt="Cropped"
          />
        )}
        {croppedImage && (
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default EasyCrop;
