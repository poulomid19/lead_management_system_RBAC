import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import axios from "axios";
const UserLeads = () => {
    const { id } = useParams(); 
    const [leads, setLeads] = useState([]);

    useEffect(() => { axios.get(`https://render.com/docs/web-services#port-binding/api/leads/${id}`, 
        { withCredentials: true })
        .then(res => setLeads([res.data.lead]))
        .catch((err) => {
        alert(err.response?.data?.message)
         console.error("Error fetching user leads:", err)
       });
      }, [id]);
  return (
    <>
      <div className="p-6"> <h1 className="text-2xl font-bold mb-4">Leads for User {id}</h1> <table className="w-full border"> <thead> <tr className="bg-gray-200"> 
        <th className="p-2 border">Name</th>
       <th className="p-2 border">Email</th>
        <th className="p-2 border">Phone</th> 
        <th className="p-2 border">Source</th> 
        <th className="p-2 border">Message</th> 
        <th className="p-2 border">Status</th>
        <th className="p-2 border">ID</th>

         </tr> 
         </thead>
          <tbody> {Array.isArray(leads) && leads.map((lead) => ( <tr key={lead._id}> <td className="p-2 border">{lead.leadname}</td> <td className="p-2 border">{lead.email}</td> <td className="p-2 border">{lead.phone}</td> <td className="p-2 border">{lead.source}</td>
          <td className="p-2 border">{lead.message}</td>
          <td className="p-2 border">{lead.leadstatus || "new"}</td> 
          <td className="p-2 border">{lead._id}</td></tr> ))} </tbody> </table> </div>
    </>
  )
}

export default UserLeads