"use client";

import React, { useEffect, useState } from "react";
import useSearchProperty from "../../addProperty/useSearchProperty";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function CurrentUserProperties() {
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);
  const { properties } = useSearchProperty();
  const router = useRouter();

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

  return (
    <div className="flex flex-col gap-6">
      {/* <Button
        onClick={() => {
          console.log(properties);
        }}
      >
        click
      </Button> */}
      {properties.length === 0 && <div className=" h-svh"></div>}
      {properties?.map((el, index) => (
        <div
          className="bg-card border-b-8 border-solid border-b-orange-200 shadow-lg grid grid-cols-[1fr_3.5fr] items-center gap-2 rounded-md"
          key={el._id}
        >
          <div className="overflow-hidden z-30 relative rounded-l-md cursor-zoom-out">
            {el.image[0] && (
              <Image
                className=" w-full h-auto hover:scale-105 transition-all duration-200"
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
              className="w-8 h-8 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
            <GrPrevious
              onClick={() => handlePreviousImage(index, el.image.length)}
              className="w-8 h-8 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
          </div>
          <div
            className="flex flex-col gap-3 px-4 cursor-pointer"
            onClick={() => {}}
          >
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
          </div>
        </div>
      ))}
    </div>
  );
}
