import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Center } from "@mantine/core"; // Import Mantine Loader

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce logic
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://grow-backend-pi.vercel.app/product/name/${searchTerm}`
      );
      setSearchResults(response.data ? [response.data] : []);
      setError(null);
    } catch (error) {
      setError("Error fetching data from the server");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Clear previous timer when searchTerm changes
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set a new timer
    const newTimer = setTimeout(() => {
      fetchSearchResults();
    }, 1000); // 1 second debounce delay

    setDebounceTimer(newTimer);

    // Clean up timer on component unmount or when searchTerm changes
    return () => clearTimeout(newTimer);
  }, [searchTerm]);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {isLoading && (
          <Center>
            <Loader type="dots" size="md" color="blue" />
          </Center>
        )}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && !error && Array.isArray(searchResults) && (
        <div className="card-container">
          {searchResults.map((result) => (
            <div className="card" key={result.id}>
              <h3>{result.name}</h3>
              <img
                src={result.photo}
                alt={result.name}
                className="card-image"
              />
              <p>Price: ${result.price}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
