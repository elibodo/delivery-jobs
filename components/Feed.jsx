"use client";

import React from "react";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";

const JobCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <JobCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  //const [searchTimeout, setSearchTimeout] = useState(null);
  //const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/job");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //   const filterJobs = (searchtext) => {
  //     const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //     return allPosts.filter(
  //       (item) =>
  //         regex.test(item.creator.username) ||
  //         regex.test(item.title) ||
  //         regex.test(item.description) ||
  //         regex.test(item.dispatchlocation) ||
  //         regex.test(item.deliverylocation) ||
  //         regex.test(item.workauthorization) ||
  //         regex.test(item.relocate) ||
  //         regex.test(item.jobtype) ||
  //         regex.test(item.experiencerequired) ||
  //         regex.test(item.additionalpay) ||
  //         regex.test(item.benefits) ||
  //         regex.test(item.resume) ||
  //         regex.test(item.drugtest) ||
  //         regex.test(item.emailupdates)
  //     );
  //   };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a job"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <JobCardList data={posts} />
    </section>
  );
};

export default Feed;
