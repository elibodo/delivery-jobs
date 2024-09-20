"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "@styles/globals.css";

const Header = () => {
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full mb-4 md:mb-12 pt-2 md:pt-5 px-6">
      <Link href="/" className="flex gap-2 flex_center">
        <p className="logo_text">
          <span className="text-orange-600">Delivery</span> Jobs
        </p>
      </Link>

      <div className="md:flex hidden">
        {session?.user ? (
          <div className="flex gap-3">
            {/* employer account links */}
            {session?.user?.accountType === "Employer" ? (
              <div className="flex gap-3">
                <Link
                  href={"/employerAccount/employerAccountHome"}
                  className="outline_button"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                  className="black_button"
                >
                  Sign Out
                </button>
              </div>
            ) : session?.user?.accountType === "Job Seeker" ? (
              //job seeker acccount links
              <div className="flex gap-3">
                <Link
                  href={"/jobSeekerAccount/jobSeekerResume"}
                  className="outline_button"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                  className="black_button"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                {/* only a signout link for an error */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                    className="black_button"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link href={"/logIn"} className="black_button">
              Sign In / Sign Up
            </Link>
          </>
        )}
      </div>
      {/* Mobile navigation */}
      <div className="md:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {/* Employer */}
            {session?.user?.accountType === "Employer" ? (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                {toggleDropdown && (
                  <div className="z-10 absolute right-0 top-full mt-3 w-full p-3 rounded-lg bg-gray-200 min-w-[150px] flex flex-col gap-3 justify-end items-end;">
                    <Link
                      href={"/employerAccount/employerAccountHome"}
                      className="text-base text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => setToggleDropdown(false)}
                    >
                      View Profile
                    </Link>
                    <Link
                      href={"/"}
                      className="text-base text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut({ callbackUrl: "/", redirect: true });
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            ) : session?.user?.accountType === "Job Seeker" ? (
              <div>
                {/* Job seeker */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                {toggleDropdown && (
                  <div className="z-10 absolute right-0 top-full mt-3 w-full p-3 rounded-lg bg-gray-200 min-w-[150px] flex flex-col gap-3 justify-end items-end;">
                    <Link
                      href={"/jobSeekerAccount/jobSeekerResume"}
                      className="text-base text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => setToggleDropdown(false)}
                    >
                      View Profile
                    </Link>
                    <Link
                      href={"/"}
                      className="text-base text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut({ callbackUrl: "/", redirect: true });
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* error */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                {toggleDropdown && (
                  <div className="z-10 absolute right-0 top-full mt-3 w-full p-3 rounded-lg bg-gray-200 min-w-[150px] flex flex-col gap-3 justify-end items-end;">
                    <Link
                      href={"/"}
                      className="text-base text-gray-700 hover:text-gray-500 font-medium"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut({ callbackUrl: "/", redirect: true });
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            {toggleDropdown && (
              <div className="z-10 absolute right-0 top-full mt-3 w-full p-3 rounded-lg bg-gray-200 min-w-[150px] flex flex-col gap-3 justify-end items-end;">
                <Link
                  href={"/logIn"}
                  className="text-base text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  Sign In
                </Link>
                <Link
                  href={"/signUp"}
                  className="text-base text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
