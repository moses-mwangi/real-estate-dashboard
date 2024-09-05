"use client";

import React, { useEffect, useState } from "react";
import useSearchProperty from "./useProperty";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Separator } from "@/components/ui/separator";
import UserPropertyOperation from "./DeleteUpdateProperty";
import { useSearchParams } from "next/navigation";

export default function CurrentUserProperties() {
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);
  const { properties, userProperties } = useSearchProperty();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchAgents() {
      setNextImageIndexes(Array(properties.length).fill(0));
    }

    fetchAgents();
  }, [properties]);

  const handleNextImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) => (i === index ? (value + 1) % imageCount : value))
    );
  };

  const handlePreviousImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) =>
        i === index ? (value - 1 + imageCount) % imageCount : value
      )
    );
  };

  let sortedProperty = userProperties;
  const sort = searchParams.get("SortBy");

  if (sort === "createdAt")
    sortedProperty = userProperties.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (sort === "price")
    sortedProperty = userProperties.sort((a, b) => a.price - b.price);

  if (sort === "type")
    sortedProperty = userProperties.sort((a, b) =>
      a.type.localeCompare(b.type)
    );

  return (
    <div className="flex flex-col gap-6">
      <Separator className=" bg-slate-200 h-[2px]" />
      {sortedProperty?.map((el, index) => (
        <div key={el._id}>
          <div
            className="bg-card shadow-lg grid grid-cols-1 sm:grid-cols-[1fr_3.5fr] items-center gap-2 rounded-md"
            key={el._id}
          >
            <div className="overflow-hidden w-full h-full relative rounded-l-md cursor-zoom-out">
              {el.image[0] && (
                <Image
                  className=" w-full h-full hover:scale-105 transition-all duration-200"
                  src={
                    el._id
                      ? el.image[nextImageIndexes[index]] || el.image[0]
                      : el.image[0]
                  }
                  alt="house"
                  width={200}
                  height={200}
                />
              )}
              <GrNext
                onClick={() => handleNextImage(index, el.image.length)}
                className="w-8 h-8 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2  text-slate-100"
              />
              <GrPrevious
                onClick={() => handlePreviousImage(index, el.image.length)}
                className="w-8 h-8 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 text-slate-100"
              />
            </div>
            <div className="flex flex-col gap-3 px-2 sm:px-4 cursor-pointer">
              {/* <div className="flex justify-between gap-3"> */}
              <div className="grid grid-cols-1 sm:flex justify-between gap-3">
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[13px] text-slate-700">{el.type}, sales</p>
                  <p className="font-semibold text-[15px] hover:text-orange-500 text-black/85">
                    {el.about}
                  </p>
                  <p className="font-medium text-[15px] text-orange-500">
                    ksh {el.price.toLocaleString()}
                  </p>
                  <p className="text-[12px] text-slate-500">
                    {el.description.substring(0, 130)}....
                  </p>
                </div>
                <div className=" sm:flex items-center justify-center">
                  <UserPropertyOperation id={el._id} />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-300" />
        </div>
      ))}
    </div>
  );
}
