"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@styles/globals.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Trigger the Google Ads page view conversion event
    window.gtag("event", "conversion", {
      send_to: "AW-16725198778/xZppCKTMjdkZELqPmac-",
      value: 1.0,
      currency: "USD",
    });
  }, []);

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
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-1 mt-4 flex flex-col content-center items-center justify-center rounded-xl bg-gray-100 p-4"
    >
      <h1 className="p-5 text-2xl font-semibold">Sign In</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center">
          <input
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            type="email"
            placeholder="Email"
            className="form_input m-2 p-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="form_input m-2 p-2"
          />
          <button className="black_button m-2">Sign In</button>
        </div>
      </div>
      <div className="m-3 flex flex-col items-center">
        <Link href={"/signUp"}>
          Dont have an account?{" "}
          <span className="font-semibold underline">Register</span>
        </Link>
        <Link href={"/passwordRequest"} className="mt-3">
          Forgot your password?{" "}
          <span className="font-semibold underline">Click Here</span>
        </Link>
        {error && (
          <div className="mt-2 w-fit rounded-md bg-red-500 px-3 py-1 text-sm text-white">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default LogIn;
