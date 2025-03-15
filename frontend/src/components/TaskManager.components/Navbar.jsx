import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

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
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      {/* Title */}
      <div className="text-white text-lg font-semibold">Task Manager</div>

      {/* Search Bar */}
      <div ref={searchBoxRef} className="relative flex items-center bg-gray-800 rounded-full px-4 py-2 flex-grow max-w-2xl">
        <Search className="w-5 h-5 text-gray-400 mr-2" />

        <input
          className="text-white outline-none bg-transparent w-full"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(searchQuery.length > 0)} // Show dropdown when focused
        />

        {searchQuery && (
          <button onClick={() => setSearchQuery("")}>
            <X className="w-5 h-5 text-gray-400 ml-2 hover:text-gray-300" />
          </button>
        )}

        {/* Search Suggestions (Dropdown) */}
        {showDropdown && (
          <div className="absolute top-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg p-3">
            <p className="text-gray-300 text-sm">Search Results</p>
            <div className="mt-2">
              <p className="text-white">🔍 {searchQuery}</p>
              <p className="text-gray-400 text-xs">Press Enter to view all results</p>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button className="px-4 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
