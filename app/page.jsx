"use client";
import React from "react";
import "@styles/globals.css";
import Link from "next/link";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <main className="app">
      <section className="w-full flex_center flex-col">
        {/* <div className="flex flex-row border border-black rounded-lg p-3 text-center">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Job Keyword.."
              className="p-2 m-2 border border-black rounded-lg bg-gray-100"
            />
            <input
              type="text"
              placeholder="Location.."
              className="p-2 m-2 border border-black rounded-lg bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Distance"
              className="p-2 m-2 border border-black rounded-lg bg-gray-100"
            />
            <button className="black_button p-2 m-2">Search</button>
          </div>
        </div> */}
        {/* <h1 className="head_text text-center">Delivery Jobs</h1> */}
        <Link href={"/employerAccount/employerAccountHome"}>
          Employer Account Link
        </Link>
        <Link href={"/jobSeekerAccount"}>Job Seeker Account Link</Link>
        <Feed />
      </section>
    </main>
  );
};

export default Home;
