import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setAuth}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");

    const handleSubmit = async (e) => { e.preventDefault(); try { const res = await axios.post("https://render.com/docs/web-services#port-binding/api/auth/login", { email, password, }, 
    { withCredentials: true }); 
    if (res.data.user.role === "admin") { navigate("/admin"); 
    } 
    else { navigate("/user"); 
    }
    setAuth(res.data.user); } 
    catch (err) 
    { console.log(err) 
     setError("Invalid credentials"); } };
  return (
    <>
   <div className="flex items-center justify-center h-screen bg-linear-to-r from-indigo-500 to-amber-500">
  <div className="bg-white p-10 rounded-xl shadow-2xl w-96">
    {/* System Heading */}
    <h1 className="text-3xl font-extrabold text-center mb-2">
      Lead Management System
    </h1>
    <p className="text-center text-gray-700 mb-6">
      Manage your leads efficiently and securely
    </p>

    {/* Login Form */}
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Login
      </button>
    </form>

    {/* Register Button */}
    <div className="mt-6 text-center">
      <p className="text-gray-600 mb-2">Don’t have an account?</p>
      <button
        onClick={() => navigate("/register")}
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
      >
        Register
      </button>
    </div>
  </div>
</div>


    </>
  )
}

export default Login