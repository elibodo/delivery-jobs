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

  //searching
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/job");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //searching
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) => regex.test(item.title) || regex.test(item.companyName)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts1 = searchedResults.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          placeholder="Search for a job"
        />
      </div>
      {searchText ? (
        <div className="feed">
          <JobCardList data={searchedResults} />
          <Pagination
            postPerPage={postPerPage}
            totalPosts={searchedResults.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className="feed">
          <JobCardList data={currentPosts} />
          <Pagination
            postPerPage={postPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      )}
    </section>
  );
};

export default Feed;
