import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
