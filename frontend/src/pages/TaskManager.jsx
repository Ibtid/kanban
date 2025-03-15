import { useState } from "react";

import KanbanBoard from "../components/TaskManager.components/Kanban";
import KanbanButtons from "../components/TaskManager.components/KanbanButtons";
import Navbar from "../components/TaskManager.components/Navbar";

export const TaskManager = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      deadline: "",
    });
    return(
      <>
        <Navbar />
        <KanbanButtons
        showForm={showForm}
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
    )
  }