import React, { useState } from "react";

const SearchJobs = ({ getSearchResults }) => {
  const [query, setQuery] = useState("");
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/api/job/search?query=${query}&distance=${distance}&location=${location}`
    );
    const jobs = await response.json();
    getSearchResults(jobs);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex justify-items-start w-full gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search_input px-10"
          placeholder="Search for a job"
        />
      </div>
      <div className="flex flex-row gap-2 mt-2">
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