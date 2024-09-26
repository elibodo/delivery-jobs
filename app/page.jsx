"use client";

import React from "react";
import "@styles/globals.css";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      {/* took out "app" classname from section.
      Everything was centering vertically so the search bar
      and jobs would never look the same on multiple pages */}
      <Feed />
    </section>
  );
};

export default Home;
