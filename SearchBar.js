import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://your-backend-domain.com/search?query=${query}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search..." 
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {results.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
