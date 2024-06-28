"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PasswordReset = (params) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const myToken = params.params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/password/reset/${myToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, myToken }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error resetting password. Try again");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center content-center items-center bg-gray-50 border-black border-2 p-4 rounded-xl"
    >
      <h1 className="text-2xl font-bold p-5">Reset your password</h1>
      <div className="flex flex-row">
        <div className=" flex flex-col items-center ">
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter your new password"
            required
            className="p-2 m-2 border border-black rounded-lg bg-gray-100"
          />
          <button className="black_button m-2">Save new password</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default PasswordReset;
