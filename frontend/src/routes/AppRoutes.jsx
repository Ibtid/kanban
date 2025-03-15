import { Route, Routes, Navigate } from "react-router-dom";
import UiPaths from "../paths/uiPaths";
import AuthForm from "../pages/AuthForm";
import { TaskManager } from "../pages/TaskManager";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={UiPaths.auth} />} />

      <Route path={UiPaths.auth} element={<AuthForm />} />

      <Route
        path={UiPaths.task}
        element={<PrivateRoute redirectTo={UiPaths.login} />}
      >
        <Route path={UiPaths.task} element={<TaskManager />} />
      </Route>

      <Route path="*" element={<div className="text-3xl">NotFound</div>} />
    </Routes>
  );
};

export default AppRoutes;
