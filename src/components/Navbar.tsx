import { useState, useRef, useEffect } from "react";
import { useSearch } from "../context/SearchContext";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";

import { Link } from "react-router-dom";
import yellowImg from "../assets/images/yellow.png";

function Navbar() {
  const [expandSearch, setExpandSearch] = useState(false);
  console.log(setExpandSearch);
  const { searchTerm, setSearchTerm } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const cartItemCount = 0;

  // Focus input when it expands
  useEffect(() => {
    if (expandSearch) {
      inputRef.current?.focus();
    }
  }, [expandSearch]);

  return (
    <div className="navbar-outer-container">
      <nav className="navbar-inner-container">
        <Link to="/">
          <img
            src={yellowImg}
            alt="Sunscreen Store Logo"
            style={{
              height: 75,
              width: 75,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>
        <div className="input-bag-container">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="search-input-container"
          >
            {/* Input visible & animated only if expanded */}
            <button
              onClick={() => setExpandSearch((prev) => !prev)}
              className="search-icon"
              aria-label="Toggle search input"
              role="button"
              tabIndex={0}
            >
              <HiOutlineSearch />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className={`search-input ${expandSearch ? "expanded" : ""}`}
            />
          </form>
          <Link to="/cart" className="shopping-bag">
            <HiOutlineShoppingBag />
            {cartItemCount > 0 && (
              <span className="shopping-bag-count">{cartItemCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
