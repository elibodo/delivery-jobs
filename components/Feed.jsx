import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import SearchJobs from "./SearchJobs";
import JobLoading from "./JobLoading";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const fetchPosts = async () => {
    const response = await fetch("/api/job");
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSearchResults = (results) => {
    setPosts(results);
    setCurrentPage(1); // Reset to page 1 when new results are fetched
  };

  return (
    <section className="feed">
      <SearchJobs getSearchResults={getSearchResults} />
      <div className="feed">
        <div className="mt-4 columns-1 space-y-4 py-4">
          {loading ? (
            <JobLoading />
          ) : (
            <>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <JobCard key={post._id} post={post} />
                ))
              ) : (
                <div className="description text-center">
                  <p className="font-semibold">No Jobs Available</p>
                  <p className="mt-2">
                    Please increase the distance, use a different search term,
                    or remove the search term to see all of the jobs near you.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage} // Pass currentPage to Pagination component
        />
      </div>
    </section>
  );
};

export default Feed;
