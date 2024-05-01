import React from "react";
import Link from "next/link";
import "@styles/globals.css";

const LogIn = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-50 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold p-5">Employer Sign In</h1>
      <div className="flex flex-row">
        <div className=" flex flex-col items-center ">
          <input
            type="email"
            placeholder="Email"
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <button className="black_button m-2">Sign In</button>
        </div>
      </div>
      <div className="flex flex-row m-3 space-x-20">
        <Link href={"/signUp"} className="">
          Dont have an account?{" "}
          <span className="font-semibold underline">Register</span>
        </Link>
      </div>
    </section>
  );
};

export default LogIn;
