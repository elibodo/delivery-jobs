"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "@styles/globals.css";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = () => {
    setToggleDropdown(false);
    signOut({ callbackUrl: "/", redirect: true });
  };

  const toggleMenu = () => {
    setToggleDropdown((prev) => !prev);
  };

  const renderMobileMenu = () => (
    <div
      id="dropdown-menu"
      className={`flex w-full flex-col items-center rounded-lg bg-slate-200 drop-shadow-2xl transition-all duration-300 ease-in-out ${
        toggleDropdown ? "mb-4 max-h-screen opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      {session?.user ? (
        <>
          {session.user.accountType === "Employer" ? (
            <MobileMenuLink
              href="/employerAccount/employerAccountHome"
              label="View Profile"
            />
          ) : (
            <MobileMenuLink
              href="/jobSeekerAccount/jobSeekerResume"
              label="View Profile"
            />
          )}
          <Link
            href="/"
            className="w-full p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400"
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <MobileMenuLink href="/logIn" label="Sign In" />
          <MobileMenuLink href="/signUp" label="Register" hasBorder={false} />
        </>
      )}
    </div>
  );

  const MobileMenuLink = ({ href, label, hasBorder = true }) => (
    <Link
      href={href}
      className={`w-full p-2 text-center text-lg font-bold text-gray-900 transition duration-200 hover:bg-gray-400 ${hasBorder ? "border-b-2 border-gray-400" : ""}`}
      onClick={() => setToggleDropdown(false)}
    >
      {label}
    </Link>
  );

  const renderDesktopMenu = () => (
    <div className="hidden md:ml-auto md:flex md:gap-3">
      {session?.user ? (
        <>
          {session.user.accountType === "Employer" ? (
            <>
              <Link
                href="/employerAccount/employerAccountHome"
                className="outline_button"
              >
                View Profile
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="black_button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/jobSeekerAccount/jobSeekerResume"
                className="outline_button"
              >
                View Profile
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="black_button"
              >
                Sign Out
              </button>
            </>
          )}
        </>
      ) : (
        <Link href="/logIn" className="black_button">
          Sign In / Sign Up
        </Link>
      )}
    </div>
  );

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
            priority={true}
          />
        </Link>

        {/* Desktop navigation buttons */}
        {renderDesktopMenu()}

        {/* Mobile navigation icon */}
        <div className="relative flex md:hidden">
          <div
            onClick={toggleMenu}
            aria-expanded={toggleDropdown}
            aria-controls="dropdown-menu"
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`size-7 transition-transform duration-300 ease-in-out ${toggleDropdown ? "-rotate-90" : ""}`}
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

      {renderMobileMenu()}
    </>
  );
};

export default Header;
