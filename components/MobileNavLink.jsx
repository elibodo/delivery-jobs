"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavLink = ({ href, children }) => {
  const pathname = usePathname();
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`py-1 px-2 rounded block text-xs ${
        active ? "text-black bg-gray-100" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
