import React from "react";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import SearchJobs from "./SearchJobs";

const Feed = () => {
  //Get posts
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/job");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="feed">
      <SearchJobs getSearchResults={(results) => setPosts(results)} />
      <div className="feed">
        <div className="space-y-4 mt-4 py-4 columns-1">
          {currentPosts.map((post) => (
            <JobCard key={post._id} post={post} />
          ))}
        </div>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </section>
  );
};

export default Feed;
