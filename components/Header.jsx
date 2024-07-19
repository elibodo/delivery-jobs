"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import "@styles/globals.css";

const Header = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex_between w-full mb-12 pt-5 pl-8">
      <Link href="/" className="flex gap-2 flex_center">
        <p className="logo_text">Delivery Jobs</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* employer account links */}
            {session?.user?.accountType === "Employer" ? (
              <div className="flex gap-3 md:gap-5">
                <Link href={"/"} className="outline_button">
                  Messages
                </Link>
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
              <div className="flex gap-3 md:gap-5">
                <Link href={"/"} className="outline_button">
                  Messages
                </Link>
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
                <div className="flex gap-3 md:gap-5">
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
    </nav>
  );
};

export default Header;
