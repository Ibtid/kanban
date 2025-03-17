import { useState, useRef, useEffect } from "react";
import { Filter, SortAsc, Calendar, User, Clock, ThumbsUp, Type, PlusCircle, ThumbsDown, ArrowUp } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";


export function KanbanButtons({ showForm, setShowFormTrue, setFilter, setSort }) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);

  const filterRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filters = [
    { label: "All", value: "all", icon: Filter },
    { label: "Incomplete", value: "incomplete", icon: ThumbsDown },
    { label: "Completed", value: "completed", icon: ThumbsUp },
    { label: "Due Soon", value: "due", icon: Calendar },
  ];

  const sorts = [
    { label: "Start Date", value: "startDate", icon: Calendar },
    { label: "Due Date", value: "dueDate", icon: Calendar },
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="flex justify-between items-center p-4 relative">
      {/* Add Task Button */}
      <button
        className={`flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-md cursor-pointer hover:bg-blue-700 transition ${
          showForm && "opacity-0"
        }`}
        onClick={setShowFormTrue}
      >
        <PlusCircle className="w-5 h-5 mr-1" />
        Add task
      </button>

      {/* Filter & Sort Buttons */}
      <div className="flex items-center space-x-4 text-gray-300">
        {/* Filter Button */}
        <div className="relative" ref={filterRef}>
          <button
            className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer transition ${
              showFilter ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="w-5 h-5 mr-1" />
            Filter
          </button>

          {/* Filter Dropdown */}
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute overflow-hidden right-0 top-12 bg-gray-900 rounded-lg shadow-lg p-3 w-48 text-white"
            >
              {filters.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer"
                  onClick={() => handleFilterChange(item.label)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(item.label)}
                    onChange={() => handleFilterChange(item.label)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Sort Button */}
        <div className="relative" ref={sortRef}>
          <button
            className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer transition ${
              showSort ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setShowSort(!showSort)}
          >
            <SortAsc className="w-5 h-5 mr-1" />
            Sort
          </button>

          {/* Sort Dropdown */}
          {showSort && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute overflow-hidden right-0 top-12 bg-gray-900 rounded-lg shadow-lg p-3 w-48 text-white"
            >
              {sorts.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer ${
                    selectedSort === item.label ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleSortChange(item.label)}
                >
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KanbanButtons;
