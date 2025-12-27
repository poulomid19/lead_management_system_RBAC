import { useState } from "react"; 
import axios from "axios";

const LeadForm = ({ onLeadAdded }) => {
    const [form, setForm] = useState(
      { 
        leadname: "", 
        email: "", 
        phone: "", 
        source: "", 
        message: ""
       }
      );
    const handleChange = (e) => { 
      setForm({ ...form, [e.target.name]: e.target.value }); 
    };
    const handleSubmit = async (e) => { 
      e.preventDefault();
    try { 
      const res = await axios.post("https://render.com/docs/web-services#port-binding/api/leads", form, 
    { withCredentials: true, }); 
    onLeadAdded(res.data.lead);
    setForm(  
      { 
        leadname: "", 
        email: "", 
        phone: "", 
        source: "", 
        message: ""
       }
      ); 
    }
    catch (err) { 
      alert(err.response?.data?.message)
      console.error(err); } };
  return (
    <>
     <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6"> 
      <h3 className="font-bold mb-2">Add Lead</h3> 
      <input name="leadname" placeholder="Name" value={form.leadname} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required /> 
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required /> 
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required /> 
      <input name="source" placeholder="Source" value={form.source} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required /> 
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required /> 
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Lead</button> 
      </form>
    </>
  )
}

export default LeadForm