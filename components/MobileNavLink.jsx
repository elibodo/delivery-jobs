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
      className={`block rounded px-2 py-1 text-xs ${
        active ? "bg-gray-100 text-black" : "text-gray-500"
      }`}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
