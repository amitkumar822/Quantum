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

      {/* ✅ Protect Agent Dashboard Route (Only Agent Can Access) */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
