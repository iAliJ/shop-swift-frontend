import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Axios from 'axios';

export default function SearchResults() {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async () => {
    try {
      if (!searchTerm) {
        console.error('Search term is required');
        return;
      }

      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await Axios.get(`/product/search?term=${encodedSearchTerm}`);
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      {searchResults.map((product) => (
        <div key={product._id}>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </div>
      ))}
    </div>
  );
}
