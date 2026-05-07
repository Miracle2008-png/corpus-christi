"use client";
import { useEffect, useState, useCallback } from "react";

interface HolySite { _id: string; name: string; country: string; city: string; description: string; image_url?: string; significance: string; latitude: number; longitude: number; slug: string; }

const empty = { name: "", country: "", city: "", description: "", image_url: "", significance: "Marian Apparition", latitude: 0, longitude: 0, slug: "" };

export default function AdminHolySites() {
  const [items, setItems] = useState<HolySite[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/holy-sites?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const save = async () => {
    setSaving(true);
    const body = { ...form, slug: String(form.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"-") };
    await fetch("/api/admin/holy-sites", { method: editing?"PUT":"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(editing?{...body,_id:editing}:body) });
    setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page);
  };
  const del = async (_id:string) => { if(!confirm("Delete this holy site?"))return; await fetch("/api/admin/holy-sites",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:HolySite) => { setForm(item as unknown as Record<string,unknown>); setEditing(item._id); setShowForm(true); };

  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Holy Sites & Pilgrimages</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} locations added</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search sites..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Holy Site</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"700px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Holy Site</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div><label style={lbl}>Name *</label><input style={inp} value={(form.name as string)||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label style={lbl}>Significance *</label>
                <select style={inp} value={(form.significance as string)||"Marian Apparition"} onChange={e=>setForm(f=>({...f,significance:e.target.value}))}>
                  {["Marian Apparition", "Eucharistic Miracle", "Major Basilica", "Saint Shrine", "Biblical Site"].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Country *</label><input style={inp} value={(form.country as string)||""} onChange={e=>setForm(f=>({...f,country:e.target.value}))}/></div>
              <div><label style={lbl}>City *</label><input style={inp} value={(form.city as string)||""} onChange={e=>setForm(f=>({...f,city:e.target.value}))}/></div>
              <div><label style={lbl}>Latitude *</label><input style={inp} type="number" step="0.000001" value={(form.latitude as number)||0} onChange={e=>setForm(f=>({...f,latitude:Number(e.target.value)}))}/></div>
              <div><label style={lbl}>Longitude *</label><input style={inp} type="number" step="0.000001" value={(form.longitude as number)||0} onChange={e=>setForm(f=>({...f,longitude:Number(e.target.value)}))}/></div>
            </div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Image URL</label><input style={inp} value={(form.image_url as string)||""} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} placeholder="https://..."/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Description *</label><textarea style={{...inp,height:"100px",resize:"vertical"}} value={(form.description as string)||""} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/></div>
            
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.name||!form.country||!form.description} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.name||!form.country||!form.description)?0.5:1}}>{saving?"Saving...":"Save Site"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["Name","Location","Significance","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={4} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={4} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No sites on the map. Add one above.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.name}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.city}, {item.country}</td>
                  <td style={{padding:"0.75rem 1rem"}}><span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#f0f0f8",color:"#3a3a8c"}}>{item.significance}</span></td>
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
