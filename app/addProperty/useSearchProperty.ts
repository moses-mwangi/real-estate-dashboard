"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Property {
  _id: string;
  image: string[];
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  createdAt: Date;
  price: number;
  city: string;
  zipcode: number;
  address: string;
  position: number[];
}

interface Data {
  type: string;
  bathrooms: number;
  bedrooms: number;
  price: number;
  city: string;
  category: string;
}

function useSearchProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAgents() {
      const propety = await axios.get(
        "https://real-estate-api-azure.vercel.app/api/property"
      );
      setProperties(propety.data.data);
    }

    fetchAgents();
  }, []);

  const onSubmit = (data: any) => {
    if (
      !data.price ||
      !data.bathrooms ||
      !data.bedrooms ||
      !data.category ||
      !data.city
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const selected = properties?.filter(
      (el) =>
        el.price <= data.price &&
        el.bathrooms <= data.bathrooms &&
        el.bedrooms <= data.bedrooms &&
        el.city <= data.city &&
        el.type === data.category
    );

    if (selected.length > 0) {
      router.push(
        `/search?price=${selected.map(
          (el) => el.price
        )}&bathrooms=${selected.map(
          (el) => el.bathrooms
        )}&bedrooms=${selected.map((el) => el.bedrooms)}&type=${selected
          .map((el) => el.type)
          .at(0)}`
      );
    } else {
      toast.error("No Property Found with the given criteria.");
    }
  };

  return { properties, onSubmit };
}

export default useSearchProperty;
