import { useDroppable } from "@dnd-kit/core";

const TrashZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  return (
    <div
      ref={setNodeRef}
      className={`fixed bottom-8 right-8 w-32 h-16 text-xs md:text-lg bg-neutral-700 md:w-64 md:h-24 flex items-center justify-center rounded-lg cursor-pointer transition border-2 border-dashed ${
        isOver ? "border-red-800 bg-red-100" : "border-red-600"
      }`}
    >
      🗑 Drop here to delete
    </div>
  );
};

export default TrashZone;