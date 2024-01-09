import React from "react";
import Link from "next/link";

const logIn = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-200 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Sign In or Create an Account</h1>
      <div className="flex flex-row">
        <div className="m-3 flex flex-col items-center border border-black rounded-xl bg-white">
          <h2 className="m-3 text-xl font-semibold">Job Seekers</h2>
          <input
            type="text"
            placeholder="Email..."
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <input
            type="password"
            placeholder="Password..."
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <button className="black_button m-2">Sign In</button>
        </div>
        <div className="m-3 flex flex-col items-center border border-black rounded-xl bg-white">
          <h2 className="m-3 text-xl font-semibold">Employers</h2>
          <input
            type="text"
            placeholder="Email..."
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <input
            type="password"
            placeholder="Password..."
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <button className="black_button m-2">Sign In</button>
        </div>
      </div>
      <div className="flex flex-row m-3 space-x-20">
        <Link href={"/signUp"} className="black_button">
          Create an Account
        </Link>
        <Link href={"/"} className="black_button">
          Forgot Password?
        </Link>
      </div>
    </section>
  );
};

export default logIn;
