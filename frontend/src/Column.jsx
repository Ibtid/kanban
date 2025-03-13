import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { motion } from 'framer-motion';

export function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }} // Initial position for animation
            animate={{ opacity: 1, y: 0 }}  // Final position for animation
            exit={{ opacity: 0, y: -10 }}   // When task is removed
            transition={{ duration: 0.3, delay: index * 0.1 }} // Delay for staggered effect
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}