import { useState } from "react";
import "./SearchBar.css";

// src/components/SearchBar.jsx
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Search offers">
      <input
        type="text"
        placeholder="Search offers…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-bar-input"
        aria-label="Search offers"
        autoComplete="off"
      />
      <button type="submit" className="search-bar-btn" aria-label="Search">
        🔍
      </button>
      {query && (
        <button
          type="button"
          className="search-bar-btn search-bar-clear"
          aria-label="Clear search"
          onClick={handleClear}
        >
          ✕
        </button>
      )}
    </form>
  );
}

export default SearchBar;