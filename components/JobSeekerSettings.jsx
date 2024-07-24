"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const JobSeekerSettings = ({ account }) => {
  const { data: session } = useSession();

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to permanently delete you profile?"
    );
    if (hasConfirmed) {
      await fetch(`/api/account/${session?.user?.email}/jobseeker`, {
        method: "DELETE",
        body: JSON.stringify({
          userID: session?.user?.id,
        }),
      });
      signOut({ callbackUrl: "/logIn", redirect: true });
    }
  };

  const [profileMessage, setProfileMessage] = useState("");

  const handleProfileInfo = async (e) => {
    e.preventDefault();
    if (!session.user.email) return "User Invalid";
    try {
      await fetch(`/api/users/${session?.user?.email}/jobseeker`, {
        method: "PATCH",
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
        }),
      });
      setProfileMessage("Profile Information Updated");
      signOut({ callbackUrl: "/logIn", redirect: true });
    } catch (error) {
      setProfileMessage("Error Updating Profile Information");
    }
  };
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  useEffect(() => {
    setProfileData({
      name: session?.user?.name,
      email: session?.user?.email,
      phoneNumber: session?.user?.phoneNumber,
    });
  }, [setProfileData]);

  return (
    <div className="flex flex-row justify-center mb-5">
      <div className="w-1/3 mx-8">
        <p className="description text-center">Edit Profile</p>
        <form onSubmit={handleProfileInfo} className="flex flex-col mb-5">
          <div className="mt-4 flex flex-col items-start">
            <label className="text-gray-900 font-semibold">Name</label>
            <input
              type="text"
              defaultValue={session.user.name}
              className="form_input mt-1"
              required
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4 flex flex-col items-start">
            <label className=" text-gray-900 font-semibold">Email</label>
            <input
              type="text"
              defaultValue={session.user.email}
              className="form_input mt-1"
              required
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4 flex flex-col items-start">
            <label className=" text-gray-900 font-semibold">Phone Number</label>
            <input
              type="text"
              defaultValue={session.user.phoneNumber}
              className="form_input mt-1"
              required
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-gray-600 text-base mt-4">
              Updating the profile options will automatically sign you out. You
              will be redirected to the Sign In page, from there you can sign in
              to view the changes.
            </p>
            <button type="submit" className="outline_button mt-4">
              Update User
            </button>
            {profileMessage && (
              <p className="mt-4 font-bold text-orange-600">{profileMessage}</p>
            )}
          </div>
        </form>
      </div>
      <div className="w-1/3 mx-8">
        <p className="description text-center">Profile Options</p>
        <p className="text-gray-600 text-base mt-4">
          To change password please sign out and navigate to the "Sign In / Sign
          Up" page. From there you can select "Forgot Password".
        </p>
        <p className="mt-4 underline font-bold">
          <a href="/termsAndConditions">View Terms and Conditions</a>
        </p>
        <p className="text-gray-600 text-base mt-4">
          To perminently delete your account select the option below. This
          action can not be undone and all information related to the account
          including all Jobs and Candidates will be removed and can not be
          recovered.
        </p>
        <div className="mt-4 flex flex-col items-center">
          <button onClick={handleDelete} className="outline_button">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSettings;
