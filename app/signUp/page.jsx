import React from "react";
import Link from "next/link";
import "@styles/globals.css";

const signUp = () => {
  return (
    <section className="flex flex-col justify-center content-center items-center bg-gray-200 border-black border-2 p-4 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <div className="flex flex-col justify-between border border-black m-3 p-2 rounded-xl bg-white">
        <div className="label_input_text">
          <label className="mr-5">Are You a Job Seeker or Employer?</label>
          <div className="flex flex-col m-auto">
            <label>
              Job Seeker <input type="radio" name="radiobtn"></input>
            </label>
            <label>
              Employer <input type="radio" name="radiobtn"></input>
            </label>
          </div>
        </div>
        <div className="label_input_text">
          <label className="mr-5">What is your first name?</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">What is your last name?</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">What is your companies name?</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">What is your email address?</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">Please confirm your email address</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">Enter a password</label>
          <input type="text" required className="input_style"></input>
        </div>
        <div className="label_input_text">
          <label className="mr-5">Confirm your password</label>
          <input type="text" required className="input_style"></input>
        </div>
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
