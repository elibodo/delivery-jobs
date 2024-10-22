import React, { useState, useCallback } from "react";

const SearchJobs = ({ getSearchResults }) => {
  const [query, setQuery] = useState("");
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      setError(""); // Reset error message before a new search

      try {
        const response = await fetch(
          `/api/job/search?query=${encodeURIComponent(query)}&distance=${distance}&location=${encodeURIComponent(location)}`,
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const jobs = await response.json();
        getSearchResults(jobs); // Pass new search results to the parent component
      } catch (error) {
        console.error("Search failed:", error);
        setError(
          "There was a problem fetching search results. Please check the information you provided.",
        );
      }
    },
    [query, distance, location, getSearchResults],
  );

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
          <option value="" disabled hidden>
            Distance
          </option>
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
          pattern="\d{5}(-\d{4})?" // Simple regex for US zip code format
        />
        <button type="submit" className="search_input_button w-1/3">
          Search
        </button>
      </div>
      {error && <p className="error-message text-red-500">{error}</p>}{" "}
      {/* Display error message */}
    </form>
  );
};

export default SearchJobs;
