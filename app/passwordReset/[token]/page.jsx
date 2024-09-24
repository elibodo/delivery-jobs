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
      className="border-1 mt-4 flex flex-col content-center items-center justify-center rounded-xl bg-gray-100 p-4"
    >
      <h1 className="p-5 text-2xl font-bold">Reset your password</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center">
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter your new password"
            required
            className="form_input m-2 p-2"
          />
          <button className="black_button m-2">Save new password</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default PasswordReset;
