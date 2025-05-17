import App from "@/App";
import LoginPage from "@/pages/LoginPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GuestRoute from "./GuestRoute";
import NotFoundPage from "@/components/NotFoundPage";
import RegisterPage from "@/pages/RegisterPage";
import Homepage from "@/pages/Homepage";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homepage />} />

      {/* ✅ Prevent logged-in users from accessing login */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      </Route>

      {/* ✅ Protect Dashboard Route (Only Admin Can Access) */}
      {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<UploadTaskPage />} />
          <Route path="agents">
            <Route path="add" element={<AddAgent />} />
            <Route path="manage" element={<ManageAgents />} />
            <Route path="tasks" element={<AgentTaskList />} />
          </Route>
        </Route>
      </Route> */}

      {/* ✅ Protect Agent Dashboard Route (Only Agent Can Access) */}
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
