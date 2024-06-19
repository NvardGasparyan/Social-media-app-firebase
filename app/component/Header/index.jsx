"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/h-page.jpg";
import { auth } from "@/app/firebase/config";
import { useUser } from "@/app/context/UserContext";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
      <Link className="flex items-center space-x-2" href="/">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-white text-2xl font-bold">HOME</span>
      </Link>

      <div className="flex space-x-4">
        {user ? (
          <>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition-all duration-300"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-all duration-300"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition-all duration-300"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
