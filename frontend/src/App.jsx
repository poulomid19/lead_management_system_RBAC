import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Register from "./components/Register";
import UserLeads from "./components/UserLeads";
import { ToastContainer } from "react-toastify";
import './App.css';
function App() {
  const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const restoreAuth = async () => {
      try {
        const res = await axios.get(
          "https://lead-management-system-rbac.onrender.com/api/auth/me",
          { withCredentials: true }
        );
        setAuth(res.data.user);
      } catch (err) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

    if (loading) {
    return <p>Checking...</p>; 
  }
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route
          path="/admin"
          element={auth?.role === "admin" ? <AdminDashboard user={auth} setAuth={setAuth}/> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={auth?.role === "user" ? <UserDashboard user={auth} setAuth={setAuth}/> : <Navigate to="/" />}
        />
         <Route path="/leads/:id" element={<UserLeads />} />
      </Routes>
      
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />
    </>
  );
}
export default App
