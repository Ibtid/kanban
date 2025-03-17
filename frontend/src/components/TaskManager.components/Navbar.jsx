import { useState, useRef, useEffect } from "react";
import { Power, Search, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchBoxRef = useRef(null); // Reference for detecting outside clicks

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      {/* Title */}
      <div className="text-white text-lg font-semibold">T/M</div>

      {/* Search Bar */}
      <div
        ref={searchBoxRef}
        className="relative flex items-center bg-gray-800 rounded-full px-2 md:px-4 py-2 w-40 md:flex-grow max-w-2xl"
      >
        <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />

        <input
          className="text-white text-xs md:text-lg outline-none bg-transparent w-full"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(searchQuery.length > 0)} // Show dropdown when focused
        />

        {searchQuery && (
          <button onClick={() => setSearchQuery("")}>
            <X className="w-5 h-5 text-gray-400 ml-2 hover:text-gray-300 z-100" />
          </button>
        )}

        {/* Search Suggestions (Dropdown) */}
        {showDropdown && (
          <div className="absolute top-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg p-3 z-100">
            <p className="text-gray-300 text-sm">Search Results</p>
            <div className="mt-2">
              <p className="text-white">🔍 {searchQuery}</p>
              <p className="text-gray-400 text-xs">
                Press Enter to view all results
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button className="p-2 md:px-4 md:py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition flex items-center">
        <Power className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden md:inline text-sm">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
