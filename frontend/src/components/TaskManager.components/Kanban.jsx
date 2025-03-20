import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../../taskSlice";
import { DndContext } from "@dnd-kit/core";
import { Column } from "./Column";

const COLUMNS = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

const KanbanBoard = ({ showForm, setShowFormFalse, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  // Fetch tasks when component mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    dispatch(updateTask({ ...taskToUpdate, status: newStatus }));
  }

  return (
    <div className="p-4">
      {/* {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>} */}

      <div className="flex gap-8 flex-col md:flex-row">
        <DndContext onDragEnd={handleDragEnd}>
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
        </DndContext>
      </div>
    </div>
  );
};


export default KanbanBoard;
