import { useState } from "react";

import KanbanBoard from "./Kanban";
import KanbanButtons from "./KanbanButtons";
import Navbar from "./Navbar";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  return (
    <>
      <Navbar />
      <KanbanButtons
        setShowFormTrue={() => {
          setShowForm(true);
        }}
      />
      <KanbanBoard
        showForm={showForm}
        setShowFormFalse={() => {
          setShowForm(false);
        }}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
}

export default App;
