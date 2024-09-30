"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileNavLink = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`block rounded p-2 text-center text-sm transition-all hover:bg-orange-600 hover:text-white ${
        active
          ? "bg-orange-600 font-semibold text-white transition-all"
          : "font-semibold text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default ProfileNavLink;
