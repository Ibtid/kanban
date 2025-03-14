import { useDraggable } from "@dnd-kit/core";

export function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    backgroundColor: isDragging ? "rgb(51, 65, 85)" : "rgb(46, 46, 46)", 
    zIndex: isDragging ? 9999 : 1, 
    boxShadow: isDragging ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none", 
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg p-4 shadow-sm hover:shadow-md transition-colors duration-200"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      <p className="mt-2 text-xs text-neutral-400">14 March 2025</p>
    </div>
  );
}
