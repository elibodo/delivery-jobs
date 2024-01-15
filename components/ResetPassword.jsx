import React from "react";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-100 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <div className="flex flex-col justify-between border border-black m-3 p-2 rounded-xl bg-white">
        <div className="label_input_text">
          <label className="mr-5">Enter reset code</label>
          <input type="email" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">New password</label>
          <input type="password" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">Confirm password</label>
          <input type="password" required className="input_style"></input>
        </div>
      </div>
      <Link href={"/"} className="black_button mt-3">
        Reset Password
      </Link>
    </section>
  );
};

export default ResetPassword;
