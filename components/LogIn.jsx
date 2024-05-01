"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@styles/globals.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Wrong email or password");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log("asdf", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center content-center items-center bg-gray-50 border-black border-2 p-4 rounded-xl"
    >
      <h1 className="text-2xl font-bold p-5">Employer Sign In</h1>
      <div className="flex flex-row">
        <div className=" flex flex-col items-center ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <button className="black_button m-2">Sign In</button>
        </div>
      </div>
      <div className="flex flex-col m-3 space-x-20">
        <Link href={"/signUp"} className="">
          Dont have an account?{" "}
          <span className="font-semibold underline">Register</span>
        </Link>
        {error && (
          <div className="bg-red-500 text-white w-fit py-1 px-3 rounded-md text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default LogIn;
