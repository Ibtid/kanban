import { useState } from "react";

import KanbanBoard from "./Kanban";
import KanbanButtons from "./KanbanButtons";
import Navbar from "./Navbar";
import AuthForm from "./Login";


function App() {
  
  return (
    <>
     {/* <AuthForm/> */}
     <TaskManager/>
    </>
  );
}

export default App;


const TaskManager = () => {
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