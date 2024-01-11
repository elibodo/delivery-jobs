"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "@styles/globals.css";

const Header = () => {
  const isUserLoggedIn = false;
  const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   const setProviders = async () => {
  //     const responce = await getProviders();
  //     setProviders(responce);
  //   };
  //   setProviders();
  // }, []);

  return (
    // top left logo
    <nav className="flex_between w-full mb-16 pt-5 pl-8">
      <Link href="/" className="flex gap-2 flex_center">
        <p className="logo_text">Delivery Jobs</p>
      </Link>

      {/* logo for the header */}

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            {/* messages button */}
            <Link href={"/"} className="outline_button">
              Messages
            </Link>

            {/* view profile button */}
            <Link href={"/"} className="outline_button">
              View Profile
            </Link>

            {/* sign out button */}
            <button type="button" onClick={signOut} className="black_button">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {/* {providers &&
              Object.values(providers).map((provider) => (
                // sign in button
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_button"
                >
                  Sign In / Sign Up
                </button>
              ))} */}
            <Link href="/logIn" className="black_button">
              Sign In / Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
