"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const EmployerSettings = ({ account }) => {
  const { data: session } = useSession();
  const [companyMessage, setCompanyMessage] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to permanently delete you profile?",
    );
    if (hasConfirmed) {
      await fetch(`/api/account/${session?.user?.email}/employer`, {
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
      const response = await fetch(
        `/api/users/${session?.user?.email}/employer`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: profileData.name,
            email: profileData.email,
            phoneNumber: profileData.phoneNumber,
          }),
        },
      );
      if (response.status === 200) {
        setProfileMessage("Profile Information Updated Successfully");
        // Optionally sign the user out after a successful update
        signOut({ callbackUrl: "/logIn", redirect: true });
      } else if (response.status === 400) {
        // Email already in use
        setProfileMessage(
          "The email address is already associated with another account. Please use a different email.",
        );
      } else if (response.status === 500) {
        // Server error (account not found or other issues)
        setProfileMessage("Failed to update account. Please try again later.");
      }
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
      await fetch(`/api/account/${session?.user?.email}/employer`, {
        method: "PATCH",
        body: JSON.stringify({
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
          streetAddress: data.streetAddress,
          City: data.City,
          State: data.State,
          ZipCode: data.ZipCode,
        }),
      });
      setCompanyMessage("Company Information Updated");
    } catch (error) {
      setCompanyMessage("Error Updating Company Information");
      console.log(error);
    }
  };
  const [data, setData] = useState({
    email: "",
    companyName: "",
    companyWebsite: "",
    streetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
  });
  useEffect(() => {
    setData({
      companyName: account.companyName,
      companyWebsite: account.companyWebsite,
      streetAddress: account.streetAddress,
      City: account.City,
      State: account.State,
      ZipCode: account.ZipCode,
    });
  }, [setData]);

  return (
    <div className="mb-5 flex flex-col justify-center md:flex-row">
      <div className="mx-8 md:w-1/3">
        <p className="description text-center">Profile Options</p>
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
                  email: e.target.value.toLowerCase(),
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
        <p className="text-base text-gray-600">
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
        <div className="mt-4 flex flex-col items-center">
          <button onClick={handleDelete} className="outline_button">
            Delete Account
          </button>
        </div>
        <div className="mt-5 border-b-2 border-gray-300 md:hidden"></div>
      </div>
      <div className="mx-8 md:w-1/3">
        <p className="description text-center">Company Information</p>
        <form onSubmit={handleAccountInfo} className="mb-5 flex flex-col">
          <div className="mt-4 flex flex-col items-start">
            <label className="font-semibold text-gray-900">Company Name</label>
            <input
              type="text"
              defaultValue={account.companyName}
              className="form_input mt-1"
              onChange={(e) =>
                setData({
                  ...data,
                  companyName: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mt-4 flex flex-col items-start">
            <label className="font-semibold text-gray-900">
              Company Website
            </label>
            <input
              type="text"
              defaultValue={account.companyWebsite}
              className="form_input mt-1"
              onChange={(e) =>
                setData({
                  ...data,
                  companyWebsite: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4 flex flex-col items-start">
            <label className="font-semibold text-gray-900">
              Street Address
            </label>
            <input
              type="text"
              defaultValue={account.streetAddress}
              className="form_input mt-1"
              onChange={(e) =>
                setData({
                  ...data,
                  streetAddress: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mt-4 flex flex-row items-start justify-between gap-3">
            <div className="1/3">
              <label className="font-semibold text-gray-900">City</label>
              <input
                type="text"
                defaultValue={account.City}
                className="form_input mt-1"
                onChange={(e) =>
                  setData({
                    ...data,
                    City: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="1/3">
              <label className="font-semibold text-gray-900">State:</label>
              <select
                className="form_input mt-1"
                onChange={(e) =>
                  setData({
                    ...data,
                    State: e.target.value,
                  })
                }
                defaultValue={account.State}
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
                type="text"
                defaultValue={account.ZipCode}
                className="form_input mt-1"
                onChange={(e) =>
                  setData({
                    ...data,
                    ZipCode: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <button type="submit" className="outline_button">
              Save Information
            </button>
            {companyMessage && (
              <p className="mt-4 font-bold text-orange-600">{companyMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerSettings;
