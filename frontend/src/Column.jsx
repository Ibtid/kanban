import { useRef, useEffect } from "react";

import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { motion, AnimatePresence } from "framer-motion";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Column({
  column,
  tasks,
  showForm,
  setShowFormFalse,
  formData,
  setFormData,
}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>

      {/* Animated Form */}
      <AnimatePresence>
        {showForm && column.id == "TODO" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-neutral-800 border-2 border-neutral-700 p-4 rounded-lg shadow-md mb-4"
          >
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 rounded bg-neutral-700 text-white outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full mb-1 p-2 rounded bg-neutral-700 text-white outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full mb-2 p-2 rounded bg-neutral-700 text-white outline-none"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                onClick={() => {
                  setShowFormFalse();
                  console.log("Saved Task:", formData);
                }}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 transition"
                onClick={() => setShowFormFalse()}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        <div ref={parent} className="flex flex-1 flex-col gap-4 z-0">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
