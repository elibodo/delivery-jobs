"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const JobSeekerSettings = ({ account }) => {
  const { data: session } = useSession();
  const [profileMessage, setProfileMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to permanently delete you profile?",
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

  const handleAccountInfo = async (e) => {
    e.preventDefault();
    if (!session.user.email) return "User Invalid";
    try {
      await fetch(`/api/account/${session?.user?.email}/jobseeker`, {
        method: "PATCH",
        body: JSON.stringify({
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        }),
      });
      setMessage("Profile Options Updated");
    } catch (error) {
      setMessage("Error Updating Information");
      console.log(error);
    }
  };
  const [data, setData] = useState({
    city: "",
    state: "",
    zipCode: "",
  });
  useEffect(() => {
    setData({
      city: account.city,
      state: account.state,
      zipCode: account.zipCode,
    });
  }, [setData]);

  return (
    <div className="mb-5 flex flex-col justify-center md:flex-row">
      <div className="mx-8 md:w-1/3">
        <p className="description text-center">Edit Profile</p>
        <form onSubmit={handleProfileInfo} className="mb-5 flex flex-col">
          <div className="mt-4 flex flex-col items-start">
            <label className="font-semibold text-gray-900">Name</label>
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
            <label className="font-semibold text-gray-900">Email</label>
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
            <label className="font-semibold text-gray-900">Phone Number</label>
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
            <p className="mt-4 text-base text-gray-600">
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
          <div className="mt-5 border-b-2 border-gray-300 md:hidden"></div>
        </form>
      </div>
      <div className="mx-8 md:w-1/3">
        <p className="description text-center">Profile Options</p>
        <div className="mt-4 flex flex-row items-start justify-between gap-3">
          <div className="1/3">
            <label className="font-semibold text-gray-900">City</label>
            <input
              defaultValue={account.city}
              type="text"
              className="form_input mt-1"
              required
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
          </div>
          <div className="1/3">
            <label className="font-semibold text-gray-900">State:</label>
            <select
              onChange={(e) => setData({ ...data, state: e.target.value })}
              defaultValue={account.state}
              className="form_input mt-1"
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="1/3">
            <label className="font-semibold text-gray-900">Zip Code</label>
            <input
              onChange={(e) => setData({ ...data, zipCode: e.target.value })}
              defaultValue={account.zipCode}
              type="text"
              className="form_input mt-1"
              required
            />
          </div>
        </div>
        <p className="mt-4 text-base text-gray-600">
          Select Update Information to update your city, state, and zip code.
        </p>
        <div className="my-4 flex flex-col items-center border-b-2 border-gray-300">
          <button onClick={handleAccountInfo} className="outline_button mb-4">
            Update Information
          </button>
          {message && (
            <p className="mb-4 font-bold text-orange-600">{message}</p>
          )}
        </div>
        <p className="mt-4 text-base text-gray-600">
          To change password please sign out and navigate to the "Sign In / Sign
          Up" page. From there you can select "Forgot Password".
        </p>
        <p className="mt-4 font-bold underline">
          <a href="/termsAndConditions">View Terms and Conditions</a>
        </p>
        <p className="mt-4 text-base text-gray-600">
          To perminently delete your account select the option below. This
          action can not be undone and all information related to the account
          including all Jobs and Candidates will be removed and can not be
          recovered.
        </p>
        <div className="mb-5 mt-4 flex flex-col items-center">
          <button onClick={handleDelete} className="outline_button">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSettings;
