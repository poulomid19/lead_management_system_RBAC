import { useState } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Register = ({setAuth}) => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const role = "user";
    const navigate = useNavigate();

    const handleSubmit = async (e) => { e.preventDefault(); try { const res = await axios.post( "http://localhost:3000/api/auth/register", { name, email, password }, { withCredentials: true } ); 
     setAuth(res.data.user); 
     navigate("/user"); } 
     catch (err) 
     { console.error("Registration failed:", err.response?.data || err.message); } };
  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96" >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input type="text" value={role} readOnly className="border p-2 w-full mb-3 rounded bg-gray-200 cursor-not-allowed" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600" >
          Register
        </button>
      </form>
    </div>
    </>
  )
}

export default Register