"use client";
import { useEffect, useState, useCallback } from "react";
interface Item { _id: string; title: string; category: string; latin?: string; source?: string; }
const PRAYER_CATS = ["Essential Prayers","Marian Prayers","Sacramental Prayers","Liturgical Prayers","Prayers for the Dead","Prayers of Praise","Morning Prayers","Evening Prayers","Other"];
const empty = { title: "", latin: "", category: "Essential Prayers", text: "", source: "", note: "" };

export default function AdminPrayers() {
  const [items, setItems] = useState<Item[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/prayers?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);
  const save = async () => { setSaving(true); await fetch("/api/admin/prayers",{method:editing?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(editing?{...form,_id:editing}:form)}); setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page); };
  const del = async (_id:string) => { if(!confirm("Delete this prayer?"))return; await fetch("/api/admin/prayers",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:Item) => { setForm(item as unknown as Record<string,unknown>); setEditing(item._id); setShowForm(true); };
  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Prayers</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} prayers added via admin</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search prayers..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Prayer</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"650px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Prayer</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div><label style={lbl}>Title *</label><input style={inp} value={(form.title as string)||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></div>
              <div><label style={lbl}>Latin Name</label><input style={inp} value={(form.latin as string)||""} onChange={e=>setForm(f=>({...f,latin:e.target.value}))} placeholder="e.g. Pater Noster"/></div>
              <div><label style={lbl}>Category *</label>
                <select style={inp} value={(form.category as string)||""} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                  {PRAYER_CATS.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Source / Scripture Reference</label><input style={inp} value={(form.source as string)||""} onChange={e=>setForm(f=>({...f,source:e.target.value}))} placeholder="e.g. Matthew 6:9-13"/></div>
            </div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Prayer Text *</label><textarea style={{...inp,height:"180px",resize:"vertical",fontFamily:"Georgia, serif",lineHeight:1.8}} value={(form.text as string)||""} onChange={e=>setForm(f=>({...f,text:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Note / Context</label><textarea style={{...inp,height:"80px",resize:"vertical"}} value={(form.note as string)||""} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Brief explanation of when/how to pray this..."/></div>
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.title||!form.text} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.title||!form.text)?0.5:1}}>{saving?"Saving...":"Save Prayer"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["Title","Latin","Category","Source","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No prayers added via admin yet.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.title}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#888",fontStyle:"italic"}}>{item.latin||"—"}</td>
                  <td style={{padding:"0.75rem 1rem"}}><span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#f0f0f8",color:"#3a3a8c"}}>{item.category}</span></td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.source||"—"}</td>
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
