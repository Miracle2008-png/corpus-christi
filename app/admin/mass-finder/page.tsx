"use client";
import { useEffect, useState, useCallback } from "react";

interface MassSchedule { _id: string; parish_name: string; address: string; city: string; country: string; contact_info?: string; weekday_masses: string[]; sunday_masses: string[]; confession_times: string[]; latitude?: number; longitude?: number; }

const empty = { parish_name: "", address: "", city: "", country: "", contact_info: "", weekday_masses: "", sunday_masses: "", confession_times: "", latitude: "", longitude: "" };

export default function AdminMassFinder() {
  const [items, setItems] = useState<MassSchedule[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/mass-finder?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const save = async () => {
    setSaving(true);
    // Parse arrays
    const body = { 
      ...form, 
      weekday_masses: String(form.weekday_masses||"").split(",").map(s=>s.trim()).filter(Boolean),
      sunday_masses: String(form.sunday_masses||"").split(",").map(s=>s.trim()).filter(Boolean),
      confession_times: String(form.confession_times||"").split(",").map(s=>s.trim()).filter(Boolean),
      latitude: Number(form.latitude) || undefined,
      longitude: Number(form.longitude) || undefined,
    };
    await fetch("/api/admin/mass-finder", { method: editing?"PUT":"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(editing?{...body,_id:editing}:body) });
    setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page);
  };
  const del = async (_id:string) => { if(!confirm("Delete this parish?"))return; await fetch("/api/admin/mass-finder",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:MassSchedule) => { 
    setForm({
      ...item as unknown as Record<string,unknown>,
      weekday_masses: item.weekday_masses?.join(", ") || "",
      sunday_masses: item.sunday_masses?.join(", ") || "",
      confession_times: item.confession_times?.join(", ") || "",
    }); 
    setEditing(item._id); setShowForm(true); 
  };

  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Mass Finder</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} parishes listed</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search parish name..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Parish</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"700px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Parish Schedule</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div style={{gridColumn:"1 / -1"}}><label style={lbl}>Parish Name *</label><input style={inp} value={(form.parish_name as string)||""} onChange={e=>setForm(f=>({...f,parish_name:e.target.value}))}/></div>
              <div style={{gridColumn:"1 / -1"}}><label style={lbl}>Address *</label><input style={inp} value={(form.address as string)||""} onChange={e=>setForm(f=>({...f,address:e.target.value}))}/></div>
              <div><label style={lbl}>City *</label><input style={inp} value={(form.city as string)||""} onChange={e=>setForm(f=>({...f,city:e.target.value}))}/></div>
              <div><label style={lbl}>Country *</label><input style={inp} value={(form.country as string)||""} onChange={e=>setForm(f=>({...f,country:e.target.value}))}/></div>
              <div><label style={lbl}>Latitude (optional)</label><input style={inp} type="number" step="0.000001" value={(form.latitude as number)||""} onChange={e=>setForm(f=>({...f,latitude:e.target.value}))}/></div>
              <div><label style={lbl}>Longitude (optional)</label><input style={inp} type="number" step="0.000001" value={(form.longitude as number)||""} onChange={e=>setForm(f=>({...f,longitude:e.target.value}))}/></div>
            </div>
            
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Contact Info (Phone/Website)</label><input style={inp} value={(form.contact_info as string)||""} onChange={e=>setForm(f=>({...f,contact_info:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Sunday Masses (comma-separated)</label><input style={inp} value={(form.sunday_masses as string)||""} onChange={e=>setForm(f=>({...f,sunday_masses:e.target.value}))} placeholder="e.g. 7:00 AM, 9:00 AM, 11:00 AM"/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Weekday Masses (comma-separated)</label><input style={inp} value={(form.weekday_masses as string)||""} onChange={e=>setForm(f=>({...f,weekday_masses:e.target.value}))} placeholder="e.g. Mon-Fri 6:30 AM"/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Confession Times (comma-separated)</label><input style={inp} value={(form.confession_times as string)||""} onChange={e=>setForm(f=>({...f,confession_times:e.target.value}))} placeholder="e.g. Sat 4:00 PM - 5:00 PM"/></div>
            
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.parish_name||!form.address||!form.city} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.parish_name||!form.address||!form.city)?0.5:1}}>{saving?"Saving...":"Save Parish"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["Parish","Location","Sunday Masses","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={4} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={4} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No parishes listed. Add one above.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.parish_name}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.city}, {item.country}</td>
                  <td style={{padding:"0.75rem 1rem"}}><span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#e8f5e9",color:"#2e7d32"}}>{item.sunday_masses?.length || 0} masses</span></td>
                  <td style={{padding:"0.75rem 1rem"}}><div style={{display:"flex",gap:"0.4rem"}}>
                    <button onClick={()=>edit(item)} style={{padding:"0.25rem 0.6rem",background:"#3498db",color:"#fff",border:"none",borderRadius:"4px",fontSize:"0.7rem",cursor:"pointer"}}>Edit</button>
                    <button onClick={()=>del(item._id)} style={{padding:"0.25rem 0.6rem",background:"#e74c3c",color:"#fff",border:"none",borderRadius:"4px",fontSize:"0.7rem",cursor:"pointer"}}>Delete</button>
                  </div></td>
                </tr>
              ))}
          </tbody>
        </table>
        {pages>1&&<div style={{display:"flex",gap:"0.5rem",padding:"1rem",justifyContent:"center",borderTop:"1px solid #eee"}}>{[...Array(pages)].map((_,i)=><button key={i} onClick={()=>load(i+1)} style={{padding:"0.4rem 0.75rem",borderRadius:"5px",border:"1px solid #ddd",background:page===i+1?"#1a2744":"#fff",color:page===i+1?"#fff":"#333",cursor:"pointer",fontSize:"0.8rem"}}>{i+1}</button>)}</div>}
      </div>
    </div>
  );
}
