"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Header = () => {
  return (
    <nav className="flex_between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        Delivery Jobs
      </Link>
    </nav>
  );
};

export default Header;
