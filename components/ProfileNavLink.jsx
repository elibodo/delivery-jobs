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
      className={`block rounded p-2 text-sm hover:bg-gray-100 ${
        active ? "font-semibold text-black" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default ProfileNavLink;
