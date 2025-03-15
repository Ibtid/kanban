import { useState, useRef, useEffect } from "react";
import { Filter, SortAsc, Calendar, User, Clock, ThumbsUp, Type, PlusCircle } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";


const KanbanButtons = ({ showForm, setShowFormTrue }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
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
            className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer transition ${showFilter ? "bg-gray-700" : "hover:bg-gray-700"}`}
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
             className="absolute overflow-hidden  right-0 top-12 bg-gray-900 rounded-lg shadow-lg p-3 w-48 text-white">
              {[ 
                { label: "Incomplete", icon: ThumbsUp },
                { label: "Completed", icon: ThumbsUp },
                { label: "Due", icon: Calendar },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer"
                >
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
            className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer transition ${showSort ? "bg-gray-700" : "hover:bg-gray-700"}`}
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
              className="absolute overflow-hidden right-0 top-12 bg-gray-900 rounded-lg shadow-lg p-3 w-48 text-white">
              {[
                { label: "Start date", icon: Calendar },
                { label: "Due date", icon: Calendar },
                { label: "Created by", icon: User },
                { label: "Created on", icon: Clock },
                { label: "Last modified on", icon: Clock },
                { label: "Completed on", icon: Clock },
                { label: "Likes", icon: ThumbsUp },
                { label: "Alphabetical", icon: Type },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer"
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
};

export default KanbanButtons;
