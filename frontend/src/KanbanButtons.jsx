const KanbanButtons = ({showForm,setShowFormTrue}) => {
    return (
        <div className="flex justify-between items-center p-4">
          <button className={`flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-blue-700 transition ${showForm && "opacity-0"}`} onClick={()=>{setShowFormTrue()}}>
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add task
          </button>
          <div className="flex items-center space-x-4 text-gray-300">
            <button className="flex items-center px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-700 transition">
              <svg
                className="w-5 h-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4h18M3 10h12M3 16h6"
                />
              </svg>
              Filter
            </button>
            <button className="flex items-center px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-700 transition">
              <svg
                className="w-5 h-5 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 9l6-6 6 6M18 15l-6 6-6-6"
                />
              </svg>
              Sort
            </button>
          </div>
        </div>
    );
}

export default KanbanButtons