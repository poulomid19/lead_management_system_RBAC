import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Logout = ({setAuth}) => {
    const navigate = useNavigate(); const handleLogout = async () => { await axios.post("http://localhost:3000/api/auth/logout", {}, 
    { withCredentials: true });
     setAuth(null); 
     navigate("/");
    };
  return (
    <> 
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" > Logout </button>
    </>
  )
}

export default Logout