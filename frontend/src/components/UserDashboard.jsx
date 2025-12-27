import { useEffect, useState } from "react"; 
import axios from "axios"; 
import LeadForm from "./LeadForm";
import LogoutButton from '../components/Logout'
import { toast } from "react-toastify";

const UserDashboard = ({ user, setAuth }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => { axios.get("https://lead-management-system-rbac.onrender.com/api/leads", 
  { withCredentials: true })
  .then(res => { 
    setLeads(res.data.leads || res.data); }) 
    .catch(err => console.error("Error fetching leads:", err)); }, []);

    const handleLeadAdded = (lead) => { 
      setLeads([...leads, lead]);
      toast.success(" Lead added successfully!"); 
    };
  return (
    <>
        <div className="min-h-screen bg-gray-50">
     <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4"> <h1 className="text-2xl font-bold">Lead Manager</h1> <span className="text-sm opacity-80">Welcome {user.role}</span> 
     </div> 
     <LogoutButton setAuth={setAuth} />
     </nav>


        <div className="p-8"> 
         <LeadForm onLeadAdded={handleLeadAdded} />
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Leads</h2> 
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white"> 
              <table className="w-full border-collapse">     
                      <thead> 
                        <tr className="bg-indigo-100 text-gray-700">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">ID</th> 
                        <th className="p-3 text-left">Email</th> 
                        <th className="p-3 text-left">Phone</th> 
                        <th className="p-3 text-left">Source</th>
                        <th className="p-3 text-left">Message</th> 
                        <th className="p-3 text-left">Status</th> 
                        </tr> 
                        </thead>
        <tbody>
           {leads.map((lead) => ( <tr key={lead._id} className="hover:bg-indigo-50 transition-colors" > 
                      <td className="p-3 border-b">{lead.leadname}</td>
                       <td className="p-3 border-b text-sm text-gray-500">{lead._id}</td>
                        <td className="p-3 border-b">{lead.email}</td>
                         <td className="p-3 border-b">{lead.phone}</td> 
                        <td className="p-3 border-b">{lead.source}</td> 
                        <td className="p-3 border-b">{lead.message}</td> 
                        <td className="p-3 border-b">{lead.leadstatus}</td> 
         </tr> ))}
          </tbody> 
         </table>
         </div>
         </div>
        </div>
    </>
  )
}

export default UserDashboard