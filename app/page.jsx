import React from "react";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex_center flex-col space-y-4">
      <h1 className="head_text text-center">
        Delivery Jobs
        <br />
        <br />
        <span className="description text-center">
          The best tool to help drivers find jobs and for employers to find
          drivers
        </span>
        <br />
        <button className="button_viewJobs">View Jobs</button>
      </h1>

      <Feed />
    </section>
  );
};

export default Home;
