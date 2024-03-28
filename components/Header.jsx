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
            <Link href={"/"} className="outline_button">
              Messages
            </Link>

            <Link
              href={"/employerAccount/employerAccountHome"}
              className="outline_button"
            >
              View Profile
            </Link>

            <button type="button" onClick={signOut} className="black_button">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_button mr-5"
                  value={"hel"}
                >
                  Job Seeker Sign In
                </button>
              ))}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_button"
                  value={"hello"}
                >
                  Employer Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
