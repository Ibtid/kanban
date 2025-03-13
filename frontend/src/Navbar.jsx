const Navbar = () =>{
    return(
        <div className="flex items-center justify-between px-4 py-2 w-full">
        {/* Title */}
        <div>Task Manager</div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 flex-grow max-w-2xl">
          <svg
            className="w-5 h-5 text-gray-300 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M15 10a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"
            />
          </svg>
          <input
            className="text-white outline-none bg-transparent"
            placeholder="Search"
          />
        </div>

        {/* Logout Button */}
        <button className="px-4 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition">
          Logout
        </button>
      </div>
    );

}

export default Navbar;