import React from "react";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

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
  //Get posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/job");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input className="search_input peer" placeholder="Search for a job" />
      </div>
      <JobCardList data={currentPosts} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </section>
  );
};

export default Feed;
