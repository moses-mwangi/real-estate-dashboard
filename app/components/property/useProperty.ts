"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUser from "../user/useUser";

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
  size: number;
  city: string;
  zip: number;
  address: string;
  position: number[];
  userId: [{ _id: string; name: string; email: string }];
}

function useSearchProperty() {
  const [properties, setProperties] = useState<Property[]>([]);
  const router = useRouter();
  const { curUser } = useUser();

  useEffect(() => {
    async function fetchAgents() {
      const propety = await axios.get("http://127.0.0.1:3008/api/property");
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

  const userProperties = properties.filter(
    (el) => el.userId[0]._id === curUser?._id
  );

  return { properties, userProperties, onSubmit };
}

export default useSearchProperty;
