"use client";

import React from "react";
import "@styles/globals.css";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="app w-full flex_center flex-col">
      <Feed />
    </section>
  );
};

export default Home;
