import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "../../taskSlice";
import { DndContext } from "@dnd-kit/core";
import { Column } from "./Column";
import TrashZone from "./TrashZone";

const COLUMNS = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

const KanbanBoard = ({ showForm, setShowFormFalse, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [isDragging, setIsDragging] = useState(false); // Track drag state

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  function handleDragStart() {
    setIsDragging(true); // Show TrashZone when dragging starts
  }

  function handleDragEnd(event) {
    setIsDragging(false); // Hide TrashZone when dragging ends

    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (newStatus === "trash") {
      dispatch(deleteTask(taskId)); // Delete task when dropped in trash
    } else {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;
      dispatch(updateTask({ ...taskToUpdate, status: newStatus }));
    }
  }

  return (
    <div className="p-4">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
         {/* Show TrashZone only when dragging */}
         {isDragging && <TrashZone />}
        <div className="flex gap-8 flex-col md:flex-row">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.title)}
              showForm={showForm}
              setShowFormFalse={setShowFormFalse}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
