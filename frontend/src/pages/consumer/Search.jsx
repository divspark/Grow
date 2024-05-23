import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://your-backend-url.com/api/data?search=${searchTerm}`);
                setSearchResults(response.data);
                setError(null);
            } catch (error) {
                setError('Error fetching data from the server');
            }
            setIsLoading(false);
        };

        if (searchTerm.trim() !== '') {
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id}>{result.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
