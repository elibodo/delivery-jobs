"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@styles/globals.css";
import { useRouter } from "next/navigation";

const signUp = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [type, setType] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !company || !email || !password) {
      setError("All fields are necessary");
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/logIn");
      } else {
        setError("User already exists.");
        console.log("User already exists.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center content-center items-center bg-gray-50 border-black border-2 p-5 rounded-xl"
    >
      <h1 className="text-2xl font-bold">Create an Employer Account</h1>
      <div className="flex flex-col justify-between border border-black m-3 p-4 rounded-xl bg-white">
        <div className="label_input_text">
          <label className="mr-5">What is your full name?</label>
          <input
            type="text"
            className="input_style"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="label_input_text">
          <label className="mr-5">What is your company name?</label>
          <input
            type="text"
            className="input_style"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="label_input_text">
          <label className="mr-5">What is your email address?</label>
          <input
            type="email"
            className="input_style"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label_input_text">
          <label className="mr-5">Enter a password</label>
          <input
            type="password"
            className="input_style"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <button className="black_button mb-3">Create Account</button>
        <Link href={"/logIn"}>
          Already have an Account?{" "}
          <span className="underline font-semibold mb-3">Click Here</span>
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

export default signUp;
