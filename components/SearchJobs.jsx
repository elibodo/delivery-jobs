import React, { useState } from "react";

const SearchJobs = ({ getSearchResults }) => {
  const [query, setQuery] = useState("");
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/job/search?query=${query}&distance=${distance}&location=${location}`,
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const jobs = await response.json();
      getSearchResults(jobs); // Pass new search results to the parent component
    } catch (error) {
      console.error("Search failed:", error);
      alert(
        "There was a problem fetching search results. Please check the information you provided.",
      );
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex w-full justify-items-start gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search_input px-10"
          placeholder="Search for a job"
        />
      </div>
      <div className="mt-2 flex flex-row gap-2">
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="search_input_select w-1/3"
          required
        >
          <option defaultValue={""} hidden></option>
          <option value={10}>10 Miles</option>
          <option value={20}>20 Miles</option>
          <option value={30}>30 Miles</option>
          <option value={50}>50 Miles</option>
          <option value={100}>100 Miles</option>
          <option value={12500}>Anywhere</option>
        </select>
        <input
          type="text"
          className="search_input_select w-1/3"
          placeholder="Your Zip Code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit" className="search_input_button w-1/3">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchJobs;
