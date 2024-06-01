import React, { useState } from 'react';
import axios from 'axios';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(searchTerm);
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }
        setIsLoading(true);
        try {
            // const response = await axios.get(`http://localhost:5000/api/v1/product/name/${searchTerm}`);
            const config = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
              };
            const response = await axios.get(`https://grow-backend-kappa.vercel.app/product/name/${searchTerm}`,config);
            setSearchResults(response.data ? [response.data] : []);
            setError(null);
        } catch (error) {
            setError('Error fetching data from the server');
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" onClick={handleClick}>Search</button>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            {!isLoading && !error && Array.isArray(searchResults) && (
                <div className="card-container">
                    {searchResults.map((result) => (
                        <div className="card" key={result.id}>
                            <h3>{result.name}</h3>
                            <img src={result.photo} alt={result.name} className="card-image"/>
                            <p>Price: ${result.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

// const Search = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/v1/product/name/${searchTerm}`);
//                 setSearchResults(response.data);
//                 setError(null);
//             } catch (error) {
//                 setError('Error fetching data from the server');
//             }
//             setIsLoading(false);
//         };

//         if (searchTerm.trim() !== '') {
//             fetchData();
//         } else {
//             setSearchResults([]);
//         }
//     }, [searchTerm]);

//     // const handleSearchChange = (event) => {
//     //     setSearchTerm(event.target.value);
//     // };

//     const handleClick = (e) => {
//         e.preventDefault();
//         setSearchTerm('event.target.value');
//     };

//     return (
//         <div className="search-container">
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 // onChange={handleSearchChange}
//             />
//             <button className="search-btn" onClick={handleClick} value={searchTerm}>Search</button>
//             {isLoading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {!isLoading && !error && Array.isArray(searchResults) && (
//     <ul>
//         {searchResults.map((result) => (
//             <li key={result.id}>{result.name}</li>
//         ))}
//     </ul>
// )}
//         </div>
//     );
// };

export default Search;
