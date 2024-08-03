"use client";

import React from "react";
import { useState } from "react";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center content-center items-center bg-gray-100  border-1 p-4 rounded-xl mt-4"
    >
      <h1 className="text-2xl font-bold p-5">Request Password Reset</h1>
      <div className="flex flex-row">
        <div className=" flex flex-col items-center ">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="form_input p-2 m-2"
          />
          <button className="black_button m-2">Send email</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default RequestPasswordReset;
