"use client";
import { useEffect, useState, useCallback } from "react";

interface Saint { _id: string; name: string; known_for: string; category: string; feast_day?: string; }

const CATEGORIES = ["martyr","doctor","confessor","virgin","bishop","apostle","pope","other"];
const empty = { name: "", known_for: "", biography_long: "", category: "other", feast_day: "", birth_date: "", death_date: "", image_url: "", patron_of: "", canonization_date: "", canonized_by_pope: "", miracles: "", quotes: "" };

export default function AdminSaints() {
  const [items, setItems] = useState<Saint[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/saints?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const save = async () => {
    setSaving(true);
    const body = { ...form, patron_of: String(form.patron_of||"").split(",").map((s:string)=>s.trim()).filter(Boolean), miracles: String(form.miracles||"").split("\n").map((s:string)=>s.trim()).filter(Boolean), quotes: String(form.quotes||"").split("\n").map((s:string)=>s.trim()).filter(Boolean), slug: String(form.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"-") };
    await fetch("/api/admin/saints", { method: editing?"PUT":"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(editing?{...body,_id:editing}:body) });
    setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page);
  };
  const del = async (_id:string) => { if(!confirm("Delete this saint?"))return; await fetch("/api/admin/saints",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:Saint) => { setForm({...item as unknown as Record<string,unknown>, patron_of: Array.isArray((item as unknown as Record<string,unknown>).patron_of)?((item as unknown as Record<string,unknown[]>).patron_of as string[]).join(", "):(item as unknown as Record<string,unknown>).patron_of||""}); setEditing(item._id); setShowForm(true); };

  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Saints</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} saints in database</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search saints..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Saint</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"700px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Saint</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div><label style={lbl}>Full Name *</label><input style={inp} value={(form.name as string)||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label style={lbl}>Category *</label>
                <select style={inp} value={(form.category as string)||"other"} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                  {CATEGORIES.map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Known For *</label><input style={inp} value={(form.known_for as string)||""} onChange={e=>setForm(f=>({...f,known_for:e.target.value}))}/></div>
              <div><label style={lbl}>Feast Day (e.g. January 1)</label><input style={inp} value={(form.feast_day as string)||""} onChange={e=>setForm(f=>({...f,feast_day:e.target.value}))}/></div>
              <div><label style={lbl}>Birth Date (e.g. 340 AD)</label><input style={inp} value={(form.birth_date as string)||""} onChange={e=>setForm(f=>({...f,birth_date:e.target.value}))}/></div>
              <div><label style={lbl}>Death Date (e.g. 397 AD)</label><input style={inp} value={(form.death_date as string)||""} onChange={e=>setForm(f=>({...f,death_date:e.target.value}))}/></div>
              <div><label style={lbl}>Canonized By (Pope name)</label><input style={inp} value={(form.canonized_by_pope as string)||""} onChange={e=>setForm(f=>({...f,canonized_by_pope:e.target.value}))}/></div>
              <div><label style={lbl}>Canonization Date</label><input style={inp} value={(form.canonization_date as string)||""} onChange={e=>setForm(f=>({...f,canonization_date:e.target.value}))}/></div>
            </div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Patron Of (comma-separated)</label><input style={inp} value={(form.patron_of as string)||""} onChange={e=>setForm(f=>({...f,patron_of:e.target.value}))} placeholder="e.g. Ireland, Nigeria, Missionaries"/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Image URL</label><input style={inp} value={(form.image_url as string)||""} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} placeholder="https://upload.wikimedia.org/..."/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Full Biography *</label><textarea style={{...inp,height:"140px",resize:"vertical"}} value={(form.biography_long as string)||""} onChange={e=>setForm(f=>({...f,biography_long:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Miracles (one per line)</label><textarea style={{...inp,height:"80px",resize:"vertical"}} value={(form.miracles as string)||""} onChange={e=>setForm(f=>({...f,miracles:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Quotes (one per line)</label><textarea style={{...inp,height:"80px",resize:"vertical"}} value={(form.quotes as string)||""} onChange={e=>setForm(f=>({...f,quotes:e.target.value}))}/></div>
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.name||!form.known_for||!form.biography_long} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.name||!form.known_for||!form.biography_long)?0.5:1}}>{saving?"Saving...":"Save Saint"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["Name","Category","Feast Day","Known For","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No saints in database. Add one above — they&apos;ll appear on the Saints page.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.name}</td>
                  <td style={{padding:"0.75rem 1rem"}}><span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#f0f0f8",color:"#3a3a8c"}}>{item.category}</span></td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.feast_day||"—"}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.known_for}</td>
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
