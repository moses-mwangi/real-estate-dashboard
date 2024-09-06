import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
  photo: string;
  role: string;
  phone: number;
}

function useUser() {
  const [curUser, setCurUser] = useState<IUser | null>(null);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split("=")[1];

    if (token) {
      getCurrentUser(token);
    } else {
      setCurUser(null);
    }
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(
          // "http://127.0.0.1:3008/api/users"
          "https://real-estate-api-azure.vercel.app/api/users"
        );

        setAllUsers(res.data.users);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    getAllUsers();
  }, []);

  async function getCurrentUser(token: string) {
    try {
      const res = await axios.get(
        // "http://127.0.0.1:3008/api/auth/me",
        "https://real-estate-api-azure.vercel.app/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCurUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  }

  const logOut = () => {
    document.cookie = `token=; path=/`;
    router.push("/login");
    setCurUser(null);
  };

  return { allUsers, curUser, logOut };
}

export default useUser;
