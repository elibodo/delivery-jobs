import React from "react";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-100 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <div className="">
        <label className="mr-5">Enter your email</label>
        <input type="email" required className="input_style"></input>
      </div>
      <Link href={"/resetPassword"} className="black_button mt-4">
        Send code to email
      </Link>
    </section>
  );
};

export default ForgotPassword;
