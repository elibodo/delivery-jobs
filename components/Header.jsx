"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "@styles/globals.css";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <>
      <nav className="mb-4 flex w-full items-center justify-between gap-8 px-6 pt-2 md:mb-10 md:pt-4">
        <Link
          href="/"
          onClick={() => setToggleDropdown(false)}
          className="flex items-center justify-center gap-2"
        >
          <Image
            width={300}
            height={200}
            src="/deliveryJobsLogo.webp"
            alt="Delivery Jobs"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          {session?.user ? (
            <div className="flex gap-3">
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
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                    className="black_button"
                  >
                    Sign Out
                  </button>
                </div>
              ) : session?.user?.accountType === "Job Seeker" ? (
                <div className="flex gap-3">
                  <Link
                    href={"/jobSeekerAccount/jobSeekerResume"}
                    className="outline_button"
                  >
                    View Profile
                  </Link>
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
              ) : (
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
              )}
            </div>
          ) : (
            <Link href={"/logIn"} className="black_button">
              Sign In / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile navigation icon */}
        <div className="relative flex md:hidden">
          <div
            onClick={() => setToggleDropdown(!toggleDropdown)}
            aria-expanded={toggleDropdown}
            aria-controls="dropdown-menu"
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`size-7 transition-transform duration-300 ease-in-out ${
                toggleDropdown ? "-rotate-90" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Dropdown Menu for Mobile */}
      <div
        id="dropdown-menu"
        className={`flex w-full flex-col items-center rounded-lg bg-slate-200 drop-shadow-2xl transition-all duration-300 ease-in-out ${
          toggleDropdown ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }} // Prevent overflow while transitioning
      >
        {session?.user ? (
          <>
            {session?.user?.accountType === "Employer" ? (
              <>
                <Link
                  href={"/employerAccount/employerAccountHome"}
                  className="w-full border-b-2 border-gray-400 p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
                  onClick={() => setToggleDropdown(false)}
                >
                  View Profile
                </Link>
                <Link
                  href={"/"}
                  className="w-full p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: "/", redirect: true });
                  }}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/jobSeekerAccount/jobSeekerResume"}
                  className="w-full border-b-2 border-gray-400 p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
                  onClick={() => setToggleDropdown(false)}
                >
                  View Profile
                </Link>
                <Link
                  href={"/"}
                  className="w-full p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: "/", redirect: true });
                  }}
                >
                  Sign Out
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link
              href={"/logIn"}
              className="w-full border-b-2 border-gray-400 p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
              onClick={() => setToggleDropdown(false)}
            >
              Sign In
            </Link>
            <Link
              href={"/signUp"}
              className="w-full p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
              onClick={() => setToggleDropdown(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
