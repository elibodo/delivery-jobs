"use client";

import React from "react";
import "@styles/globals.css";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <main className="app">
      <section className="w-full flex_center flex-col">
        <Feed />
      </section>
    </main>
  );
};

export default Home;
