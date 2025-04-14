
import React, { useCallback } from 'react';

function SearchBar({ onSearch }) {
  const handleChange = useCallback((e) => {
    onSearch(e.target.value);
  }, [onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expenses..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;