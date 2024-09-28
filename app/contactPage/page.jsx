"use client";

import { useEffect, useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        setStatusMessage("Message sent successfully!");
      } else {
        setStatusMessage("Failed to send message.");
      }
    } catch (error) {
      setStatusMessage("Error occurred. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleContact}
      className="mx-auto mt-4 flex max-w-lg flex-col items-center justify-center rounded-xl bg-gray-100 p-6"
    >
      <h1 className="mb-6 text-2xl font-semibold">Contact Form</h1>

      <div className="flex w-full gap-4">
        <input
          required
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          type="text"
          placeholder="First Name"
          className="w-1/2 rounded-lg p-3 text-sm text-gray-700 outline-0"
        />
        <input
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          type="text"
          placeholder="Last Name"
          className="w-1/2 rounded-lg p-3 text-sm text-gray-700 outline-0"
        />
      </div>

      <div className="mt-4 w-full">
        <input
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg p-3 text-sm text-gray-700 outline-0"
        />
        <textarea
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Write your message here..."
          className="mt-4 w-full resize-none rounded-lg p-3 text-sm text-gray-700 outline-0"
          rows="5"
        />
      </div>

      <button className="black_button my-4 rounded-lg bg-black py-2 text-white">
        Send Message
      </button>

      {/* Instructions Message */}
      <div className="text-center text-sm text-gray-900">
        <p>
          Thank you for wanting to contact us! Once we receive your message we
          will get back to you as soon as possible. We appreciate your patience.
        </p>
        <p className="mt-4 font-semibold text-orange-600">{statusMessage}</p>
      </div>
    </form>
  );
};

export default ContactPage;
