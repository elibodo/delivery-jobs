import React from "react";
import Link from "next/link";

const signUp = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-200 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <div className="flex flex-col border border-black m-3 p-2 rounded-xl bg-white">
        <label>
          What is your first name?
          <input
            type="text"
            required
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label className=" justify-between">
          What is your last name?
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label>
          What is your companies name?
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label>
          What is your email address?
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label>
          Confirm your email address
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label>
          Enter a password
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
        <label>
          Confirm your password
          <input
            type="text"
            className="p-1 m-2 border border-black rounded-lg bg-gray-100"
          ></input>
        </label>
      </div>
      <div>
        <Link href={"/"} className="black_button">
          Create Account
        </Link>
      </div>
    </section>
  );
};

export default signUp;
